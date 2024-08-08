import Hero from '@/components/Hero'
// import Kanban from '@/components/Kanban/index';
import Devices from '@/components/Devices'
import UserNav from '@/components/user/UserNav';

export default function Home() {
  return (
    <div>
      <UserNav/>
      <Hero/>
      <Devices/>
    </div>
    );
}
