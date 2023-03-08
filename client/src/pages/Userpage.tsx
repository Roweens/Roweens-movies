import { UserSettings } from '../components/UserSettings';
import { Watchlist } from '../components/Watchlist';

export function Userpage() {
  return (
    <div className="userpage">
      <Watchlist />
      <UserSettings />
    </div>
  );
}
