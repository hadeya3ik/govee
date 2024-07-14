import { motion } from 'framer-motion';
import styles from './styles.module.scss';


export default function Link3D({children}) {
  return (
    <div className={styles.button}>
        <motion.div 
            className={styles.slider}
            transition={{ duration: 0.5, type: "tween", ease: [0.76, 0, 0.24, 1]}}
        >
            <div 
                className={styles.el}
            >
                <div className={styles.perspectiveText}>
                    <p>{children}</p>
                    <p>{children}</p>
                </div>
            </div>
        </motion.div>
    </div>
  )
}

