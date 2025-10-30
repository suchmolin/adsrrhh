import { Select } from "flowbite-react"
import { estados } from "@/data/estados"

export default function SelectEstados({ onCityChange }) {
  const customTheme = {
    root: {
      base: "flex",
    },
    field: {
      select: {
        colors: {
          gray: "border-0 ring-0 focus:border-primary focus:ring-primary text-gray-600",
        },
      },
    },
  }

  const handleChange = (e) => {
    if (onCityChange) {
      onCityChange(e.target.value)
    }
  }

  return (
    <Select
      theme={customTheme}
      id="estados"
      className="border border-gray-300 rounded-md"
      onChange={handleChange}
    >
      <option value="">Toda Venezuela</option>
      {estados.map((estado) => (
        <option key={estado} value={estado}>
          {estado}
        </option>
      ))}
    </Select>
  )
}
