import Hero from '@/components/Hero'
import GroupList from '@/components/Groups/GroupList'
// import Automations from '@/components/Automations';
import Kanban from '@/components/Kanban/index';
// import Navigation from '@/components/Navigation';


export default function Home() {
  return (
    <div>
      <Hero/>
      <Kanban/>
      <GroupList/>
      {/* <Automations/> */}
    </div>
    );
}
