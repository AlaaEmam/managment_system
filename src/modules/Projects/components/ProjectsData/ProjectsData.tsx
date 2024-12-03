import React from 'react'

import styles from '../ProjectsAddList.module.css'
import { Link } from 'react-router-dom'
export default function ProjectsData() {
  return (
    <div className={styles['bg-project']}>
      <div className='d-flex bg-white flex-column'>
        <Link to="/dashboard/projectsList" className={styles["view-project"]}>
          {`${'<'}`} View All Projects
        </Link>
        <h1 className={styles['view-project']}>Add a new Project</h1>
      </div>
      
      
      <div className={styles["wrapper"]}>
          
          <div>
            
          </div>
      </div>
    </div>
  )
}
