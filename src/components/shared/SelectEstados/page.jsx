import { Select } from "flowbite-react"
import { estados } from "@/data/estados"

export default function SelectEstados() {
  const customTheme = {
    root: {
      base: "flex",
    },
    field: {
      select: {
        colors: {
          gray: "border-0 ring-0 focus:border-red-400 focus:ring-red-400 text-gray-600",
        },
      },
    },
  }
  return (
    <Select theme={customTheme} id="estados">
      <option value="">Toda Venezuela</option>
      {estados.map((estado) => (
        <option key={estado} value={estado}>
          {estado}
        </option>
      ))}
    </Select>
  )
}
