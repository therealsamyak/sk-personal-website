import type { PortableTextBlock } from "emdash"

const WORDS_PER_MINUTE = 200
const CJK_CHARACTERS_PER_MINUTE = 500
const WHITESPACE_REGEX = /\s+/
const CJK_CHARACTER_REGEX =
  /\p{Script=Han}|\p{Script=Hangul}|\p{Script=Hiragana}|\p{Script=Katakana}/gu

interface PortableTextSpan {
  _type: string
  text?: string
}

interface PortableTextTextBlock extends PortableTextBlock {
  _type: "block"
  children: PortableTextSpan[]
}

const isTextBlock = (block: PortableTextBlock): block is PortableTextTextBlock =>
  block._type === "block" && Array.isArray(block.children)

const countWords = (text: string): number => text.split(WHITESPACE_REGEX).filter(Boolean).length

const countCjkCharacters = (text: string): number => text.match(CJK_CHARACTER_REGEX)?.length ?? 0

/**
 * Extract plain text from Portable Text blocks
 */
export const extractText = (blocks: PortableTextBlock[] | undefined): string => {
  if (!blocks || !Array.isArray(blocks)) return ""

  return blocks
    .reduce<string[]>((acc, block) => {
      if (!isTextBlock(block)) return acc
      const text = block.children.reduce<string>((spanAcc, child) => {
        if (child._type === "span" && typeof child.text === "string") {
          return spanAcc + child.text
        }
        return spanAcc
      }, "")
      acc.push(text)
      return acc
    }, [])
    .join(" ")
}

/**
 * Calculate reading time in minutes from Portable Text content
 */
export const getReadingTime = (content: PortableTextBlock[] | undefined): number => {
  const text = extractText(content)
  const cjkCharacterCount = countCjkCharacters(text)
  const wordCount = countWords(text.replace(CJK_CHARACTER_REGEX, " "))
  const minutes = Math.ceil(
    wordCount / WORDS_PER_MINUTE + cjkCharacterCount / CJK_CHARACTERS_PER_MINUTE,
  )
  return Math.max(1, minutes)
}
