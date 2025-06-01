import React, { useEffect, useMemo, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CarouselSection from './CategorySection/CarouselSection';
import MainCarousel from './MainCarousel';
import MoodFeaturePromo from './MoodSection/MoodFeaturePromo';
import MidCarousel from './CategorySection/CompactCarouselSection';
import SubscribeButton from './CategorySection/SubscribeButton';
import { motion } from 'framer-motion';
import { getSubscriptionDetailsApi } from '../../services/api';
import { setCurrentPlan } from '../../redux/slices/userSlice';
import NotificationCenter from '../notification/NotificationCenter'
import { addNotification } from '../../redux/slices/notificationSlice';
import { toast } from 'react-toastify';
import { AppDispatch, RootState } from '../../redux/store';
import WatchListSection from './WatchListSection';
import { fetchMovies } from '../../redux/slices/movieSlice';


const Index = () => {
  const dispatch = useDispatch<AppDispatch>();
  const isLoggedIn = useSelector((state: RootState) => state.user.isLoggedIn);

  const mainRef = useRef<HTMLDivElement | null>(null);
  

  useEffect(() => {
    dispatch(fetchMovies())
    fetchCurrentPlan();
    syncStoredNotifications();
    if(mainRef.current) {
      mainRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [dispatch]);

  const syncStoredNotifications = () => {
    try {
      const stored = localStorage.getItem('notifications');
      if (stored) {
        const notifications = JSON.parse(stored);
        notifications.forEach((notification: any) => {
          dispatch(addNotification({
            title: notification.title,
            body: notification.body,
            timestamp: notification.timestamp || Date.now(),
          }))
        })
        localStorage.removeItem('notifications');
      }
    } catch (err: any) {
      toast.error(err?.message || "Couldn't sync notifications");
    }
  }

  const fetchCurrentPlan = async () => {
    try {
      const response = await getSubscriptionDetailsApi();
      if (response) {
        if (response?.status === 'pending' || response?.status === 'cancelled') {
          dispatch(setCurrentPlan("Basic"));
          return;
        }
        dispatch(setCurrentPlan(response?.plan));
      }
    } catch (err: any) {
      toast.error(err?.message || "Couldn't fetch subscription details");
    }
  }

  const sections = useMemo(() => [
    { component: <CarouselSection type="Trending" heading="Top Trending" />, condition: true },
    { component: <WatchListSection />, condition: isLoggedIn },
    { component: <CarouselSection type="NewRelease" heading="New Release" />, condition: true },
    { component: <CarouselSection type="FanFavourite" heading="Fan Favourite" />, condition: true },
    { component: <MidCarousel type="MidCarousel" />, condition: true },
    { component: <CarouselSection type="Mood" heading="Find By Mood" />, condition: true },
    { component: <CarouselSection type="Action" heading="Action Packed" />, condition: true },
    { component: <CarouselSection type="Horror" heading="Horror Nights" />, condition: true }
  ], [isLoggedIn]);

  return (
    <div ref={mainRef} className="relative w-full min-h-screen bg-black text-white">
      <div className="fixed top-0 z-50 p-4">
        <NotificationCenter />
      </div>

      <SubscribeButton />
      
      <section className="w-full mb-10">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <MoodFeaturePromo />
          <MainCarousel />
        </motion.div>
      </section>

      <section className="w-full flex flex-col mb-10">
        {sections.map((section, index) =>
          section.condition && (
            <div key={index} className="mb-8">
              {index === 0 ? (
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                  viewport={{ once: true, margin: "-100px 0px" }}
                >
                  {section.component}
                </motion.div>
              ) : (
                section.component
              )}
            </div>
          )
        )}
      </section>
    </div>
  );
};

export default Index;