import Hero from '@/components/Hero'
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
