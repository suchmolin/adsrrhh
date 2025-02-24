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
          gray: "border-0 ring-0 focus:border-primary focus:ring-primary text-gray-600",
        },
      },
    },
  }
  return (
    <Select
      theme={customTheme}
      id="estados"
      className="border border-gray-300 rounded-md "
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
