import React from 'react'
import { motion } from 'framer-motion'
import { fadeInUp, scaleIn } from '../../utils/animations'

const AnimatedCard = ({ 
  children, 
  className = '', 
  animation = 'fadeInUp',
  delay = 0,
  hover = true,
  onClick 
}) => {
  const animations = {
    fadeInUp,
    scaleIn
  }

  const selectedAnimation = animations[animation] || fadeInUp

  return (
    <motion.div
      className={`animated-card ${className}`}
      variants={selectedAnimation}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{ duration: 0.5, delay }}
      whileHover={hover ? { scale: 1.02 } : undefined}
      whileTap={hover ? { scale: 0.98 } : undefined}
      onClick={onClick}
    >
      {children}
    </motion.div>
  )
}

export default AnimatedCard