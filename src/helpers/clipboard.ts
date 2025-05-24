/**
 * copyToClipboard.ts
 * This function copies a given text to the clipboard.
 * @param text - The text to copy to the clipboard.
 * @example - If the text is "Hello World", it will copy "Hello World" to the clipboard.
 */

const copyToClipboard = (text: string) => {
  if (navigator.clipboard && window.isSecureContext) {
    return navigator.clipboard.writeText(text)
  } else {
    const textArea = document.createElement('textarea')
    textArea.value = text
    textArea.style.position = 'fixed' // Prevent scrolling to bottom of page in MS Edge.
    document.body.appendChild(textArea)
    textArea.focus()
    textArea.select()

    return new Promise<void>((resolve, reject) => {
      try {
        document.execCommand('copy')
        resolve()
      } catch (err) {
        reject(err instanceof Error ? err : new Error(String(err)))
      } finally {
        document.body.removeChild(textArea)
        console.log('Copying text to clipboard:', text)
      }
    })
  }
}
export default copyToClipboard
