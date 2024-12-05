import { uploadImage } from "@/libs/firebase-config"

export class FilesController {
  static uploadFile = (file: File, dir: string): Promise<any> => {
    // TODO: Implement
    return new Promise((resolve, reject) => {
      const reader = new FileReader()

      reader.onloadend = async () => {
        const base64 = reader.result?.toString().split(',')[1]
        if (!base64) {
          resolve({ status: 'fail', message: 'Invalid image' })
          return
        }
        try {
          const response: Record<string, any> = await uploadImage({
            imageBase64: base64,
            filename: file.name
          })
          resolve({ status: 'success', imageUrl: response.data.image })
        } catch (error: any) {
          resolve({ status: 'fail', message: error.message })
        }
      }
      reader.onerror = error => {
        reject({ status: 'fail', message: 'Error reading file', error })
      }

      reader.readAsDataURL(file)
    })
  }
}
