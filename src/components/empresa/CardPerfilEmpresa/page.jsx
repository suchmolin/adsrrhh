import Image from "next/image"
import { useState } from "react"
import updateCompany from "@/functions/post/updateCompany"

// Sanitize HTML - basic cleanup for safe rendering
const sanitizeHtml = (html) => {
    if (!html) return ''
    // Remove potentially dangerous tags/attributes but keep basic formatting
    return html
        .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '') // Remove scripts
        .replace(/on\w+="[^"]*"/gi, '') // Remove event handlers
        .replace(/on\w+='[^']*'/gi, '') // Remove event handlers (single quotes)
        .trim()
}

export default function CardPerfilEmpresa({ companyData, empresaId }) {

    const [isEditing, setIsEditing] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [profileImage, setProfileImage] = useState(null);
    const [editedData, setEditedData] = useState({
        name: companyData?.name || '',
        identification_card: companyData?.identification_card || '',
        email: companyData?.email || '',
        phone: companyData?.phone || '',
        city: companyData?.city || '',
        street: companyData?.street || '',
        comment: companyData?.comment || '',
        linkedin_profile: companyData?.linkedin_profile || ''
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

                if (!empresaId) {
                    throw new Error('No se pudo obtener el ID de la empresa');
                }


                const result = await updateCompany(empresaId, imageData);


                // Actualizar los datos originales
                if (companyData) {
                    companyData.image_1920 = URL.createObjectURL(file);
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
                city: editedData.city,
                street: editedData.street,
                phone: editedData.phone,
                comment: editedData.comment,
                linkedin_profile: editedData.linkedin_profile
            };

            // Usar el empresaId pasado como prop
            if (!empresaId) {
                throw new Error('No se pudo obtener el ID de la empresa');
            }



            // Hacer la petición PATCH
            const result = await updateCompany(empresaId, dataToUpdate);



            // Actualizar los datos originales con los nuevos datos
            Object.assign(companyData, dataToUpdate);

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
            name: companyData?.name || '',
            identification_card: companyData?.identification_card || '',
            email: companyData?.email || '',
            phone: companyData?.phone || '',
            city: companyData?.city || '',
            street: companyData?.street || '',
            comment: companyData?.comment || '',
            linkedin_profile: companyData?.linkedin_profile || ''
        });
        setProfileImage(null);
        setError(null);
        setIsEditing(false);
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

    return (
        <div className="w-full flex flex-col gap-5">
            <div className="w-full bg-white CShadow3 relative flex flex-col items-center gap-3 py-5 rounded-xl px-5">
                <div className="relative rounded-full overflow-hidden w-[170px] aspect-square group">
                    <Image
                        src={
                            profileImage
                                ? URL.createObjectURL(profileImage)
                                : companyData?.image_1920
                                    ? `data:image/jpeg;base64,${companyData.image_1920}`
                                    : "/img/imagen-empresa.png"
                        }
                        fill
                        style={{ objectFit: 'cover' }}
                        alt="Logo de la Empresa"
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
                                placeholder="Nombre de la empresa"
                            />
                            <div className="flex gap-2 justify-center">
                                <input
                                    type="text"
                                    value={editedData.identification_card}
                                    className="text-center text-xl border border-gray-300 rounded px-2 py-1 flex-1 bg-gray-100 cursor-not-allowed"
                                    placeholder="RIF"
                                    disabled
                                />
                            </div>
                        </div>
                    ) : (
                        <>
                            <h2 className="font-[monserrat-black] text-2xl mb-1">
                                {companyData?.name || 'Nombre no especificado'}
                            </h2>
                            <p className="text-xl">
                                RIF: {companyData?.identification_card || 'No especificado'}
                            </p>
                        </>
                    )}
                </div>
                <div className="w-full flex flex-col gap-2">
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
                            <p className="text-gray-700">{companyData?.city || 'No especificada'}</p>
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
                            <p className="text-gray-700">{companyData?.street || 'No especificada'}</p>
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
                            <p className="text-gray-700">{companyData?.email || 'No especificado'}</p>
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
                            <p className="text-gray-700">{formatPhone(companyData?.phone)}</p>
                        )}
                    </div>
                    <div className="w-full flex flex-col lg:flex-row lg:justify-between lg:items-center gap-1 lg:gap-0">
                        <p className="font-bold flex items-center mr-5">
                            <Image src="/img/mail.png" width={20} height={20} alt="linkedin_profile" />
                            Sitio Web:
                        </p>
                        {isEditing ? (
                            <input
                                type="url"
                                value={editedData.linkedin_profile}
                                onChange={(e) => handleInputChange('linkedin_profile', e.target.value)}
                                className="text-gray-700 border border-gray-300 rounded px-2 py-1 w-full lg:w-64"
                                placeholder="https://ejemplo.com"
                            />
                        ) : (
                            <p className="text-gray-700">{companyData?.linkedin_profile || 'No especificado'}</p>
                        )}
                    </div>
                </div>
            </div>

            <div className="w-full bg-white CShadow3 relative flex flex-col items-center gap-3 py-5 rounded-xl px-4">
                <h2 className="text-primary text-3xl text-center font-[monserrat-black]">
                    Descripción
                </h2>
                <div className="w-full">
                    {isEditing ? (
                        <textarea
                            value={editedData.comment}
                            onChange={(e) => handleInputChange('comment', e.target.value)}
                            className="w-full text-gray-700 border border-gray-300 rounded px-2 py-1 min-h-[100px]"
                            placeholder="Describe tu empresa, misión, visión, valores..."
                        />
                    ) : (
                        <div
                            className="prose max-w-none text-gray-700 leading-relaxed [&_p]:mb-3 [&_ul]:list-disc [&_ul]:ml-6 [&_ol]:list-decimal [&_ol]:ml-6 [&_li]:mb-1 [&_strong]:font-semibold [&_em]:italic [&_a]:text-blue-600 [&_a]:underline"
                            dangerouslySetInnerHTML={{ __html: sanitizeHtml(companyData?.comment) || 'No especificada' }}
                        />
                    )}
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
