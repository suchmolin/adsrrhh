import Image from "next/image"
import { useState } from "react"
import updateJobSeeker from "@/functions/post/updateJobSeeker"

export default function CardPerfilCandidato({ jobSeekerData, candidatoId }) {

  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [profileImage, setProfileImage] = useState(null);
  const [editedData, setEditedData] = useState({
    name: jobSeekerData?.name || '',
    type_of_identification_card: jobSeekerData?.type_of_identification_card || '',
    identification_card: jobSeekerData?.identification_card || '',
    born_date: jobSeekerData?.born_date || '',
    gender: jobSeekerData?.gender || '',
    city: jobSeekerData?.city || '',
    street: jobSeekerData?.street || '',
    email: jobSeekerData?.email || '',
    phone: jobSeekerData?.phone || ''
  });

  const handleInputChange = (field, value) => {
    setEditedData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleImageChange = async (event) => {
    const file = event.target.files[0];
    if (file) {
      // Validar extensión del archivo
      const allowedExtensions = ['jpg', 'jpeg', 'png', 'webp'];
      const fileExtension = file.name.split('.').pop().toLowerCase();

      if (!allowedExtensions.includes(fileExtension)) {
        setError('Solo se permiten archivos JPG, JPEG, PNG y WEBP');
        return;
      }

      // Validar tamaño del archivo (máximo 5MB)
      if (file.size > 5 * 1024 * 1024) {
        setError('El archivo no puede ser mayor a 5MB');
        return;
      }

      setError(null);
      setProfileImage(file);

      // Actualizar inmediatamente el campo image_1920
      try {
        setIsLoading(true);
        const imageData = {
          image_1920: file
        };

        if (!candidatoId) {
          throw new Error('No se pudo obtener el ID del candidato');
        }

        const result = await updateJobSeeker(candidatoId, imageData);

        // Actualizar los datos originales
        if (jobSeekerData) {
          jobSeekerData.image_1920 = URL.createObjectURL(file);
        }

      } catch (err) {

        setError(err.message || 'Error al actualizar la imagen');
        // Revertir la imagen si hay error
        setProfileImage(null);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const triggerImageUpload = () => {
    document.getElementById('profile-image-upload').click();
  };

  const handleSave = async () => {
    try {
      setIsLoading(true);
      setError(null);

      // Preparar los datos para enviar (solo los campos editables)
      const dataToUpdate = {
        name: editedData.name,
        born_date: editedData.born_date,
        gender: editedData.gender,
        city: editedData.city,
        street: editedData.street,
        phone: editedData.phone
      };

      // Usar el candidatoId pasado como prop
      if (!candidatoId) {
        throw new Error('No se pudo obtener el ID del candidato');
      }



      // Hacer la petición PATCH
      const result = await updateJobSeeker(candidatoId, dataToUpdate);



      // Actualizar los datos originales con los nuevos datos
      Object.assign(jobSeekerData, dataToUpdate);

      // Limpiar la imagen temporal
      setProfileImage(null);
      setIsEditing(false);

    } catch (err) {

      setError(err.message || 'Error al guardar los datos');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    setEditedData({
      name: jobSeekerData?.name || '',
      type_of_identification_card: jobSeekerData?.type_of_identification_card || '',
      identification_card: jobSeekerData?.identification_card || '',
      born_date: jobSeekerData?.born_date || '',
      gender: jobSeekerData?.gender || '',
      city: jobSeekerData?.city || '',
      street: jobSeekerData?.street || '',
      email: jobSeekerData?.email || '',
      phone: jobSeekerData?.phone || ''
    });
    setProfileImage(null);
    setError(null);
    setIsEditing(false);
  };

  // Función para formatear la fecha de nacimiento
  const formatBirthDate = (dateString) => {
    if (!dateString) return 'No especificada';

    // Manejar diferentes formatos de fecha
    if (dateString.includes('-')) {
      const parts = dateString.split('-');
      if (parts[0].length === 4) {
        // Formato YYYY-MM-DD: 2000-03-12
        return `${parts[2]}/${parts[1]}/${parts[0]}`;
      } else {
        // Formato DD-MM-YYYY: 12-03-2000
        return `${parts[0]}/${parts[1]}/${parts[2]}`;
      }
    } else if (dateString.includes('/')) {
      // Formato DD/MM/YYYY: 12/03/2000
      return dateString;
    } else {
      // Otros formatos, intentar con Date
      const date = new Date(dateString);
      const day = date.getDate().toString().padStart(2, '0');
      const month = (date.getMonth() + 1).toString().padStart(2, '0');
      const year = date.getFullYear();
      return `${day}/${month}/${year}`;
    }
  };

  // Función para formatear el género
  const formatGender = (gender) => {
    if (!gender) return 'No especificado';
    return gender === 'M' ? 'Masculino' : gender === 'F' ? 'Femenino' : 'No especificado';
  };

  // Función para formatear el teléfono
  const formatPhone = (phone) => {
    if (!phone) return 'No especificado';
    // Si el teléfono no tiene código de país, agregar +58 (Venezuela)
    if (!phone.startsWith('+')) {
      return `+58 ${phone}`;
    }
    return phone;
  };

  // Función para formatear la cédula con el tipo
  const formatIdentification = (type, number) => {
    if (!type || !number) return 'No especificada';
    return `${type}-${number}`;
  };

  return (
    <div className="w-full flex flex-col gap-5">
      <div className="w-full bg-white CShadow3 relative flex flex-col items-center gap-3 py-5 rounded-xl px-5">
        <div className="relative rounded-full overflow-hidden w-[170px] aspect-square group">
          <Image
            src={
              profileImage
                ? URL.createObjectURL(profileImage)
                : jobSeekerData?.image_1920
                  ? `data:image/jpeg;base64,${jobSeekerData.image_1920}`
                  : "/img/imagen-candidatos.png"
            }
            fill
            style={{ objectFit: 'cover' }}
            alt="Foto de Perfil"
          />
          {isLoading && (
            <div className="w-full h-full bg-black/50 absolute flex items-center justify-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
            </div>
          )}
          <div
            className="w-full h-full bg-grisads/90 opacity-0 group-hover:opacity-100 absolute duration-300 cursor-pointer flex items-center justify-center"
            onClick={triggerImageUpload}
          >
            <div className="w-5/12 aspect-square relative opacity-70">
              <Image
                src="/img/editar.png"
                fill
                style={{ objectFit: 'contain' }}
                alt="editar"
              />
            </div>
          </div>
          <input
            id="profile-image-upload"
            type="file"
            accept=".jpg,.jpeg,.png,.webp"
            onChange={handleImageChange}
            className="hidden"
            disabled={isLoading}
          />
        </div>
        <div className="w-full text-center">
          {isEditing ? (
            <div className="flex flex-col gap-2">
              <input
                type="text"
                value={editedData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                className="text-center font-[monserrat-black] text-2xl border border-gray-300 rounded px-2 py-1"
                placeholder="Nombre completo"
              />
              <div className="flex gap-2 justify-center">
                <input
                  type="text"
                  value={editedData.type_of_identification_card}
                  className="text-center text-xl border border-gray-300 rounded px-2 py-1 w-16 bg-gray-100 cursor-not-allowed"
                  placeholder="Tipo"
                  maxLength="1"
                  disabled
                />
                <span className="text-xl">-</span>
                <input
                  type="text"
                  value={editedData.identification_card}
                  className="text-center text-xl border border-gray-300 rounded px-2 py-1 flex-1 bg-gray-100 cursor-not-allowed"
                  placeholder="Número de cédula"
                  disabled
                />
              </div>
            </div>
          ) : (
            <>
              <h2 className="font-[monserrat-black] text-2xl mb-1">
                {jobSeekerData?.name || 'Nombre no especificado'}
              </h2>
              <p className="text-xl">
                {formatIdentification(jobSeekerData?.type_of_identification_card, jobSeekerData?.identification_card)}
              </p>
            </>
          )}
        </div>
        <div className="w-full flex flex-col gap-2">
          <div className="flex justify-between items-center">
            <p className="font-bold">Fecha de Nacimiento:</p>
            {isEditing ? (
              <input
                type="date"
                value={editedData.born_date}
                onChange={(e) => handleInputChange('born_date', e.target.value)}
                className="text-gray-700 border border-gray-300 rounded px-2 py-1 w-48"
              />
            ) : (
              <p className="text-gray-700">{formatBirthDate(jobSeekerData?.born_date)}</p>
            )}
          </div>
          <div className="flex justify-between items-center">
            <p className="font-bold">Género:</p>
            {isEditing ? (
              <select
                value={editedData.gender}
                onChange={(e) => handleInputChange('gender', e.target.value)}
                className="text-gray-700 border border-gray-300 rounded px-2 py-1 w-48"
              >
                <option value="">Seleccionar</option>
                <option value="M">Masculino</option>
                <option value="F">Femenino</option>
              </select>
            ) : (
              <p className="text-gray-700">{formatGender(jobSeekerData?.gender)}</p>
            )}
          </div>
          <div className="flex justify-between items-center">
            <p className="font-bold">Ciudad:</p>
            {isEditing ? (
              <input
                type="text"
                value={editedData.city}
                onChange={(e) => handleInputChange('city', e.target.value)}
                className="text-gray-700 border border-gray-300 rounded px-2 py-1 w-48"
                placeholder="Ciudad"
              />
            ) : (
              <p className="text-gray-700">{jobSeekerData?.city || 'No especificada'}</p>
            )}
          </div>
        </div>
      </div>

      <div className="w-full bg-white CShadow3 relative flex flex-col items-center gap-3 py-5 rounded-xl px-4">
        <h2 className="text-primary text-3xl text-center font-[monserrat-black]">
          Contacto
        </h2>
        <div className="w-full flex flex-col gap-2">
          <div className="w-full flex flex-col lg:flex-row lg:justify-between lg:items-center gap-1 lg:gap-0">
            <p className="font-bold flex items-center mr-5">
              <Image
                src="/img/direccion.png"
                width={20}
                height={20}
                alt="direccion"
              />
              Dirección:
            </p>
            {isEditing ? (
              <input
                type="text"
                value={editedData.street}
                onChange={(e) => handleInputChange('street', e.target.value)}
                className="text-gray-700 border border-gray-300 rounded px-2 py-1 w-full lg:w-64"
                placeholder="Dirección"
              />
            ) : (
              <p className="text-gray-700">{jobSeekerData?.street || 'No especificada'}</p>
            )}
          </div>
          <div className="w-full flex flex-col lg:flex-row lg:justify-between lg:items-center gap-1 lg:gap-0">
            <p className="font-bold flex items-center mr-5 text-nowrap">
              <Image src="/img/mail.png" width={20} height={20} alt="email" />
              E-mail:
            </p>
            {isEditing ? (
              <input
                type="email"
                value={editedData.email}
                className="text-gray-700 border border-gray-300 rounded px-2 py-1 w-full lg:w-64 bg-gray-100 cursor-not-allowed"
                placeholder="Email"
                disabled
              />
            ) : (
              <p className="text-gray-700">{jobSeekerData?.email || 'No especificado'}</p>
            )}
          </div>
          <div className="w-full flex flex-col lg:flex-row lg:justify-between lg:items-center gap-1 lg:gap-0">
            <p className="font-bold flex items-center mr-5">
              <Image src="/img/celu.png" width={20} height={20} alt="telefono" />
              Teléfono:
            </p>
            {isEditing ? (
              <input
                type="tel"
                value={editedData.phone}
                onChange={(e) => handleInputChange('phone', e.target.value)}
                className="text-gray-700 border border-gray-300 rounded px-2 py-1 w-full lg:w-64"
                placeholder="Teléfono"
              />
            ) : (
              <p className="text-gray-700">{formatPhone(jobSeekerData?.phone)}</p>
            )}
          </div>
        </div>
      </div>

      {/* Mensaje de error */}
      {error && (
        <div className="w-full bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          <div className="flex items-center">
            <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
            </svg>
            {error}
          </div>
        </div>
      )}

      {/* Botones de acción */}
      <div className="w-full flex justify-center gap-4 mt-4">
        {!isEditing ? (
          <button
            onClick={() => setIsEditing(true)}
            className="px-6 py-2 bg-primary text-white rounded-md hover:bg-primary/90 transition-colors flex items-center gap-2"
          >
            <Image
              src="/img/editar.png"
              width={16}
              height={16}
              alt="editar"
            />
            Editar Perfil
          </button>
        ) : (
          <div className="flex gap-4 sm:pb-60">
            <button
              onClick={handleSave}
              disabled={isLoading}
              className={`px-6 py-2 rounded-md transition-colors flex items-center gap-2 ${isLoading
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-green-600 hover:bg-green-700'
                } text-white`}
            >
              {isLoading ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  Guardando...
                </>
              ) : (
                <>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Guardar
                </>
              )}
            </button>
            <button
              onClick={handleCancel}
              disabled={isLoading}
              className={`px-6 py-2 rounded-md transition-colors flex items-center gap-2 ${isLoading
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-gray-500 hover:bg-gray-600'
                } text-white`}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
              Cancelar
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
