import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { ThemeProvider } from "./context/ThemeContext";
import MainLayout from "./layouts/MainLayout";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import NeonProfile from "./pages/NeonProfile";
import GameSettings from "./pages/GameSettings";
import Achievements from "./pages/Achievements";
import ErrorPlayground from "./pages/ErrorPlayground";
import ChatMockup from "./pages/ChatMockup";
import MusicVibes from "./pages/MusicVibes";
import ArcadeLeaderboard from "./pages/ArcadeLeaderboard";
import MemeGallery from "./pages/MemeGallery";
import FantasyShop from "./pages/FantasyShop";
import NotificationsCenter from "./pages/NotificationsCenter";
import ThemeLab from "./pages/ThemeLab";
import LoadingMuseum from "./pages/LoadingMuseum";
import SecretRoom from "./pages/SecretRoom";
import TaskBoard from "./pages/TaskBoard";
import WeatherUI from "./pages/WeatherUI";
import SocialFeed from "./pages/SocialFeed";
import FunFormLab from "./pages/FunFormLab";
import GrandFinale from "./pages/GrandFinale";
import BounceHouse from "./pages/BounceHouse";
import MemoryMatch from "./pages/MemoryMatch";
import TypingRace from "./pages/TypingRace";
import EmojiDecoder from "./pages/EmojiDecoder";
import SpinWheel from "./pages/SpinWheel";
import TreasureHunt from "./pages/TreasureHunt";
import PaintSplatter from "./pages/PaintSplatter";
import MusicBox from "./pages/MusicBox";
import DiscoFloor from "./pages/DiscoFloor";
import MagicShow from "./pages/MagicShow";
import HauntedHouse from "./pages/HauntedHouse";
import CasinoRoyale from "./pages/CasinoRoyale";
import TimeCapsule from "./pages/TimeCapsule";
import ArtGallery from "./pages/ArtGallery";
import PlanetExplorer from "./pages/PlanetExplorer";
import CookingChaos from "./pages/CookingChaos";
import SportsArena from "./pages/SportsArena";
import PuzzlePalace from "./pages/PuzzlePalace";
import PhotoBooth from "./pages/PhotoBooth";
import MazeRunner from "./pages/MazeRunner";

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <ThemeProvider>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route element={<MainLayout />}>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/profile" element={<NeonProfile />} />
              <Route path="/settings" element={<GameSettings />} />
              <Route path="/achievements" element={<Achievements />} />
              <Route path="/errors" element={<ErrorPlayground />} />
              <Route path="/chat" element={<ChatMockup />} />
              <Route path="/music" element={<MusicVibes />} />
              <Route path="/leaderboard" element={<ArcadeLeaderboard />} />
              <Route path="/memes" element={<MemeGallery />} />
              <Route path="/shop" element={<FantasyShop />} />
              <Route path="/notifications" element={<NotificationsCenter />} />
              <Route path="/themes" element={<ThemeLab />} />
              <Route path="/loaders" element={<LoadingMuseum />} />
              <Route path="/secret" element={<SecretRoom />} />
              <Route path="/tasks" element={<TaskBoard />} />
              <Route path="/weather" element={<WeatherUI />} />
              <Route path="/social" element={<SocialFeed />} />
              <Route path="/forms" element={<FunFormLab />} />
              <Route path="/finale" element={<GrandFinale />} />
              <Route path="/bounce" element={<BounceHouse />} />
              <Route path="/memory" element={<MemoryMatch />} />
              <Route path="/typing" element={<TypingRace />} />
              <Route path="/decoder" element={<EmojiDecoder />} />
              <Route path="/spinwheel" element={<SpinWheel />} />
              <Route path="/treasure" element={<TreasureHunt />} />
              <Route path="/paint" element={<PaintSplatter />} />
              <Route path="/musicbox" element={<MusicBox />} />
              <Route path="/disco" element={<DiscoFloor />} />
              <Route path="/magic" element={<MagicShow />} />
              <Route path="/haunted" element={<HauntedHouse />} />
              <Route path="/casino" element={<CasinoRoyale />} />
              <Route path="/timecapsule" element={<TimeCapsule />} />
              <Route path="/artgallery" element={<ArtGallery />} />
              <Route path="/planets" element={<PlanetExplorer />} />
              <Route path="/cooking" element={<CookingChaos />} />
              <Route path="/sports" element={<SportsArena />} />
              <Route path="/puzzle" element={<PuzzlePalace />} />
              <Route path="/photobooth" element={<PhotoBooth />} />
              <Route path="/maze" element={<MazeRunner />} />
            </Route>
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </ThemeProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}
