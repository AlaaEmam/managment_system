import '../Dashboard.css';
import Progress from '../../../../assets/icons/progress.svg';
import Tasks from '../../../../assets/icons/task.svg';
import Projects from '../../../../assets/icons/projects.svg';
import DashboardBox from '../DashboardBox/DashboardBox';
import Header from '../../../Shared/components/Header/Header';


export default function Dashboard() {
  const cardsData = [
    {
        icon: Progress,
        label: 'Progress',
        value: '% 90',
        iconBgClass: 'color-icon-bg-1'
    },
    {
        icon: Tasks,
        label: 'Tasks Number',
        value: '1293',
        iconBgClass: 'color-icon-bg-2'
    },
    {
        icon: Projects,
        label: 'Projects Number',
        value: '32',
        iconBgClass: 'color-icon-bg-3'
    }
];
const cardsData2 = [
  {
      icon: Progress,
      label: 'Active',
      value: '90',
      iconBgClass: 'color-icon-bg-1'
  },
  {
      icon: Tasks,
      label: 'Inactive',
      value: '13',
      iconBgClass: 'color-icon-bg-2'
  },

];
  return (
      <>
    <Header/>
    <div className='container'>
      <div className='row d-flex justify-content-around g-4 mx-3'>
        <DashboardBox 
            title="Tasks" 
            description="Lorem ipsum dolor sit amet, consectetur." 
            cards={cardsData} 
        />
        <DashboardBox 
            title="User" 
            description="More details can be added here." 
            cards={cardsData2} 
        />
      </div>
  </div>
  </>
  );
}
