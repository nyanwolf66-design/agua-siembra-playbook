import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

const SECTIONS_DIR = path.join(process.cwd(), 'content/sections')

export const PARTS = [
  { id: 'p1', title: 'Quiénes Somos',        num: 'I',   color: '#1F8A5B' },
  { id: 'p2', title: 'Qué Vendemos',          num: 'II',  color: '#0E2A3A' },
  { id: 'p3', title: 'A Quién le Vendemos',   num: 'III', color: '#1F8A5B' },
  { id: 'p4', title: 'Cómo Vendemos',         num: 'IV',  color: '#0E2A3A' },
  { id: 'p5', title: 'El Proceso',            num: 'V',   color: '#1F8A5B' },
  { id: 'p6', title: 'Cómo nos Comportamos',  num: 'VI',  color: '#0E2A3A' },
  { id: 'ax', title: 'Anexos',                num: '—',   color: '#6B7A85' },
]

export function getAllSections() {
  const files = fs.readdirSync(SECTIONS_DIR)
    .filter(f => f.endsWith('.md'))
    .sort()

  return files.map(filename => {
    const raw = fs.readFileSync(path.join(SECTIONS_DIR, filename), 'utf8')
    const { data, content } = matter(raw)
    return {
      id:      data.id,
      partId:  data.partId,
      n:       data.n,
      title:   data.title,
      content: content.trim(),
    }
  })
}
