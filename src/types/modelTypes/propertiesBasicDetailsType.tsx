export interface FormDataType {
  basicDetails: Record<string, any>
  location: Record<string, any>
  amenities: Record<string, boolean>
  photos: string[]
  contact: Record<string, any>
  policies: Record<string, any>
  rooms: Array<Record<string, any>>
}
