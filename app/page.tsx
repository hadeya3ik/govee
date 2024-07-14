import Hero from '@/components/Hero'
import Devices from '@/components/Devices/Devices'
import Groups from '@/components/Groups/Groups'
import Automations from '@/components/Automations';
import Kanban from '@/components/Kanban/index';
// import Navigation from '@/components/Navigation';


export default function Home() {
  return (
    <div>
      <Hero/>
      <Kanban/>
      <Groups/>
      <Automations/>
      <Devices/>
    </div>
    );
}
