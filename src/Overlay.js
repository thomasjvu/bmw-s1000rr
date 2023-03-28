import { Children } from 'react'
import { motion } from 'framer-motion'
import { useStore } from './store'
import SimpleIconsBmw from './Logo'

const container = {
  hidden: { opacity: 0, height: 0, transition: { staggerChildren: 0.05 } },
  show: {
    opacity: 1,
    height: 'auto',
    transition: { when: 'beforeChildren', staggerChildren: 0.05 }
  }
}

const item = {
  hidden: { opacity: 0, y: '100%' },
  show: { opacity: 1, y: 0 }
}

function List({ children, open }) {
  return (
    <motion.ul variants={container} initial="hidden" animate={open ? 'show' : 'hidden'}>
      {Children.map(children, (child) => (
        <li>
          <motion.div variants={item}>{child}</motion.div>
        </li>
      ))}
    </motion.ul>
  )
}

export function Overlay() {
  const state = useStore()
  return (
    <>
      <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}>
        <a
          className="creator"
          href="https://thomasjvu.com/"
          target="_blank"
          style={{ position: 'absolute', bottom: 40, left: 40, fontSize: '15px' }}>
          @THOMASJVU
        </a>
        <div className="cta" style={{ position: 'absolute', bottom: 40, right: 40, fontSize: '15px' }}>
          <a href="https://www.bmwmotorcycles.com/en/models/sport/s1000rr.html" target="_blank">
            Purchase Here
          </a>
        </div>
      </div>
      <SimpleIconsBmw style={{ position: 'absolute', top: 40, left: 40, width: 60, height: 60 }} />
      <div className="info">
        <h1>BMW S1000 RR</h1>
        <List open={state.open}>
          <h3>SUPERBIKE OF SUPERLATIVES</h3>
          <p className="base-price">
            <span className="inter">BASE: </span>$17,895
          </p>
          <p className="price">
            <span className="inter">AS SHOWN: </span>$24,730
          </p>
          <p className="context">
            The BMW S 1000 RR is a high-performance motorcycle designed to thrill and excite riders of all levels. Its sleek and aerodynamic
            design, combined with a powerful 999cc engine, delivers lightning-fast acceleration and top-notch handling. Whether you're
            carving up the track or exploring winding roads, this motorcycle is sure to provide an unforgettable ride.
          </p>
          <p className="copyright">
            <a href="https://skfb.ly/6DBVq">BMW RR 1000</a> by lsalcedo is licensed under{' '}
            <a href="http://creativecommons.org/licenses/by/4.0/">Creative Commons Attribution</a>. 
            <span className=""> BMW is property of BMW</span>.
          </p>
        </List>
      </div>
    </>
  )
}
