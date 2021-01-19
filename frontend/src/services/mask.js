export const cpfMask = value => {
    return value
      .replace(/\D/g, '')
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d{1,2})/, '$1-$2')
      .replace(/(-\d{2})\d+?$/, '$1')
}

export const phoneMask = value => {
    return value
      .replace(/(\D)/g, '')
}

export const nameMask = value => {
  const [first, second] = value.toLocaleLowerCase().split(' ')

  return `
      ${first.charAt(0).toUpperCase() + first.slice(1)} 
      ${second.charAt(0).toUpperCase() + second.slice(1)}
  `
}