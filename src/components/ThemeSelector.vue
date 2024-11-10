<script setup>
import { ref, watch, onMounted } from 'vue'
import { useTheme } from '../composables/useTheme'

const { setTheme } = useTheme()

const ALGORITHMS = {
  CONTRAST: 'contrast',
  MONOCHROMATIC: 'monochromatic',
  ANALOGOUS: 'analogous'
}

const selectedColor = ref('#ffaf36')
const selectedAlgorithm = ref(ALGORITHMS.CONTRAST)

// Funciones mejoradas de conversión de color
const hexToLab = (hex) => {
  if (!/^#([0-9A-F]{3}){1,2}$/i.test(hex)) {
    throw new Error('Invalid hex color')
  }
  
  // Normalizar hex de 3 dígitos
  if (hex.length === 4) {
    hex = '#' + hex[1] + hex[1] + hex[2] + hex[2] + hex[3] + hex[3]
  }

  // Convertir a RGB
  const r = parseInt(hex.slice(1, 3), 16) / 255
  const g = parseInt(hex.slice(3, 5), 16) / 255
  const b = parseInt(hex.slice(5, 7), 16) / 255

  // Convertir RGB a XYZ
  let x = r * 0.4124 + g * 0.3576 + b * 0.1805
  let y = r * 0.2126 + g * 0.7152 + b * 0.0722
  let z = r * 0.0193 + g * 0.1192 + b * 0.9505

  // Convertir XYZ a Lab
  x = x / 0.95047
  z = z / 1.08883

  x = x > 0.008856 ? Math.pow(x, 1/3) : (7.787 * x) + 16/116
  y = y > 0.008856 ? Math.pow(y, 1/3) : (7.787 * y) + 16/116
  z = z > 0.008856 ? Math.pow(z, 1/3) : (7.787 * z) + 16/116

  const l = (116 * y) - 16
  const a = 500 * (x - y)
  const b_val = 200 * (y - z)

  return [l, a, b_val]
}

const labToHex = (l, a, b) => {
  let y = (l + 16) / 116
  let x = a / 500 + y
  let z = y - b / 200

  // Convertir Lab a XYZ
  x = 0.95047 * ((x * x * x > 0.008856) ? x * x * x : (x - 16/116) / 7.787)
  y = ((y * y * y > 0.008856) ? y * y * y : (y - 16/116) / 7.787)
  z = 1.08883 * ((z * z * z > 0.008856) ? z * z * z : (z - 16/116) / 7.787)

  // Convertir XYZ a RGB
  let r = x *  3.2406 + y * -1.5372 + z * -0.4986
  let g = x * -0.9689 + y *  1.8758 + z *  0.0415
  let b_val = x *  0.0557 + y * -0.2040 + z *  1.0570

  // Ajustar valores RGB
  r = r > 0.0031308 ? 1.055 * Math.pow(r, 1/2.4) - 0.055 : 12.92 * r
  g = g > 0.0031308 ? 1.055 * Math.pow(g, 1/2.4) - 0.055 : 12.92 * g
  b_val = b_val > 0.0031308 ? 1.055 * Math.pow(b_val, 1/2.4) - 0.055 : 12.92 * b_val

  // Convertir a hex
  const toHex = (n) => {
    const hex = Math.max(0, Math.min(255, Math.round(n * 255))).toString(16)
    return hex.length === 1 ? '0' + hex : hex
  }

  return `#${toHex(r)}${toHex(g)}${toHex(b_val)}`
}

const calculateColorContrast = (color1, color2) => {
  const lab1 = hexToLab(color1)
  const lab2 = hexToLab(color2)
  
  return Math.sqrt(
    Math.pow(lab1[0] - lab2[0], 2) +
    Math.pow(lab1[1] - lab2[1], 2) +
    Math.pow(lab1[2] - lab2[2], 2)
  )
}

function generateContrastTheme(baseColor) {
  const [l, a, b] = hexToLab(baseColor)
  const luminosity = l
  
  // Asegurar mayor contraste para el color secundario
  const secondaryL = luminosity > 50 ? 
    Math.max(0, Math.min(luminosity - 50, 30)) : // Si el color base es claro, hacer el secundario más oscuro
    Math.min(100, Math.max(luminosity + 50, 70)) // Si el color base es oscuro, hacer el secundario más claro
  
  const secondaryA = -a // Invertir completamente el componente a
  const secondaryB = -b // Invertir completamente el componente b
  
  // Ajustar el color de acento para mantener buen contraste
  const accentL = Math.min(100, Math.max(0, luminosity > 50 ? luminosity - 30 : luminosity + 30))
  const accentA = a * 0.8 + (Math.random() - 0.5) * 20
  const accentB = b * 0.8 + (Math.random() - 0.5) * 20
  
  // Ajustar el color terciario
  const tertiaryL = Math.min(100, Math.max(0, luminosity > 50 ? 35 : 65))
  const tertiaryA = -accentA
  const tertiaryB = -accentB

  return {
    primary: baseColor,
    secondary: labToHex(secondaryL, secondaryA, secondaryB),
    'secondary-foreground': luminosity > 100 || luminosity < 50 ? baseColor : '#ffffff',
    accent: labToHex(accentL, accentA, accentB),
    neutral: luminosity > 85 ? '#121212' : '#ffffff',
    tertiary: labToHex(tertiaryL, tertiaryA, tertiaryB)
  }
}

function generateMonochromaticTheme(baseColor) {
  const [l, a, b] = hexToLab(baseColor)
  const luminosity = l
  
  // Aumentar la diferencia de luminosidad
  const secondaryL = luminosity > 50 ?
    Math.max(0, Math.min(luminosity - 45, 35)) :
    Math.min(100, Math.max(luminosity + 45, 65))
    
  const accentL = Math.min(100, Math.max(0, luminosity > 50 ? luminosity - 25 : luminosity + 25))
  const tertiaryL = Math.min(100, Math.max(0, luminosity > 50 ? luminosity - 15 : luminosity + 15))

  // Reducir la saturación para mejorar legibilidad
  const saturationMod = 0.85

  return {
    primary: baseColor,
    secondary: labToHex(secondaryL, a * saturationMod, b * saturationMod),
    'secondary-foreground': luminosity > 100 || luminosity < 50 ? baseColor : '#ffffff',
    accent: labToHex(accentL, a * saturationMod, b * saturationMod),
    neutral: luminosity > 80 ? '#121212' : '#ffffff',
    tertiary: labToHex(tertiaryL, a * saturationMod, b * saturationMod)
  }
}

function generateAnalogousTheme(baseColor) {
  const [l, a, b] = hexToLab(baseColor)
  const luminosity = l
  
  // Aumentar el contraste ajustando la luminosidad
  const secondaryL = luminosity > 50 ?
    Math.max(0, Math.min(luminosity - 40, 40)) :
    Math.min(100, Math.max(luminosity + 40, 60))
    
  const accentL = Math.min(100, Math.max(0, luminosity > 50 ? luminosity - 20 : luminosity + 20))
  
  // Mantener el ángulo pero aumentar el contraste
  const angle1 = Math.PI / 6
  const angle2 = -Math.PI / 6
  
  const rotate = (a, b, angle) => {
    const magnitude = Math.sqrt(a * a + b * b)
    const currentAngle = Math.atan2(b, a)
    const newAngle = currentAngle + angle
    return [
      magnitude * Math.cos(newAngle) * 0.9, // Reducir ligeramente la saturación
      magnitude * Math.sin(newAngle) * 0.9
    ]
  }
  
  const [secondaryA, secondaryB] = rotate(a, b, angle1)
  const [accentA, accentB] = rotate(a, b, angle2)
  const [tertiaryA, tertiaryB] = rotate(a, b, angle1 * 0.5)

  return {
    primary: baseColor,
    secondary: labToHex(secondaryL, secondaryA, secondaryB),
    'secondary-foreground': luminosity > 100 || luminosity < 50 ? baseColor : '#ffffff',
    accent: labToHex(accentL, accentA, accentB),
    neutral: luminosity > 80 ? '#121212' : '#ffffff',
    tertiary: labToHex(Math.max(0, l - 10), tertiaryA, tertiaryB)
  }
}

const updateTheme = () => {
  try {
    const currentColor = selectedColor.value
    const algorithm = selectedAlgorithm.value

    let newTheme
    
    switch (algorithm) {
      case ALGORITHMS.CONTRAST:
        newTheme = generateContrastTheme(currentColor)
        break
      case ALGORITHMS.MONOCHROMATIC:
        newTheme = generateMonochromaticTheme(currentColor)
        break
      case ALGORITHMS.ANALOGOUS:
        newTheme = generateAnalogousTheme(currentColor)
        break
      default:
        newTheme = generateContrastTheme(currentColor)
    }

    if (newTheme && typeof newTheme === 'object') {
      setTheme(newTheme)
    }
  } catch (error) {
    console.error('Error al generar el tema:', error)
  }
}

watch(
  [selectedColor, selectedAlgorithm],
  ([newColor, newAlgorithm]) => {
    if (!Object.values(ALGORITHMS).includes(newAlgorithm)) {
      console.error('Algoritmo inválido:', newAlgorithm)
      selectedAlgorithm.value = ALGORITHMS.CONTRAST
      return
    }
    updateTheme()
  },
  { immediate: true }
)

onMounted(() => {
  updateTheme()
})
</script>

<template>
  <div class="fixed bottom-4 right-4 flex flex-col gap-4 items-end">
    <div class="flex border gap-4 items-center bg-white p-4 rounded-lg shadow">
      <select 
        v-model="selectedAlgorithm"
        class="px-3 py-2 rounded-lg border border-gray-200"
        aria-label="Seleccionar algoritmo de color"
      >
        <option value="contrast">Contraste</option>
        <option value="monochromatic">Monocromático</option>
        <option value="analogous">Análogo</option>
      </select>
      
      <input
        type="color"
        v-model="selectedColor"
        class="w-12 h-12 rounded cursor-pointer"
        aria-label="Seleccionar color base"
      >
    </div>
  </div>
</template> 