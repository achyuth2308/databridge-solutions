
// import { useEffect } from 'react'
// import { useLocation } from 'react-router-dom'

// function ScrollToTop() {
//   const { pathname, hash } = useLocation()

//   useEffect(() => {
//     if (hash) {
//       // Scroll to specific section (service / industry)
//       setTimeout(() => {
//         const element = document.querySelector(hash)
//         if (element) {
//           element.scrollIntoView({
//             behavior: 'smooth',
//             block: 'start',
//           })
//         }
//       }, 100)
//     } else {
//       // Normal page navigation → top
//       window.scrollTo({
//         top: 0,
//         left: 0,
//         behavior: 'smooth',
//       })
//     }
//   }, [pathname, hash])

//   return null
// }

// export default ScrollToTop
// ------------------------------
import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

function ScrollToTop() {
  const { pathname, hash } = useLocation()

  useEffect(() => {
    const scrollToHash = () => {
      if (hash) {
        const id = hash.replace('#', '')
        const element = document.getElementById(id)
        if (element) {
          const yOffset = -100 // adjust if you have sticky header
          const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset
          window.scrollTo({ top: y, behavior: 'smooth' })
        }
      } else {
        window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })
      }
    }

    // Delay slightly to wait for page rendering
    const timer = setTimeout(scrollToHash, 150)

    return () => clearTimeout(timer)
  }, [pathname, hash])

  return null
}

export default ScrollToTop
