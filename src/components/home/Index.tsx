import React, { useEffect, useMemo } from 'react';
import { Skeleton, Box, LinearProgress } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import CarouselSection from './CategorySection/CarouselSection';
import MainCarousel from './MainCarousel';
import MoodFeaturePromo from './MoodSection/MoodFeaturePromo';
import MidCarousel from './CategorySection/CompactCarouselSection';
import { fetchMovies } from '../../redux/slices/movieSlice';
import SubscribeButton from './CategorySection/SubscribeButton';
import { motion } from 'framer-motion';
import { getSubscriptionDetailsApi } from '../../services/api';
import { setCurrentPlan } from '../../redux/slices/userSlice';
import NotificationCenter from '../notification/NotificationCenter'
import { addNotification } from '../../redux/slices/notificationSlice';
import { toast } from 'react-toastify';
import { AppDispatch, RootState } from '../../redux/store';
import WatchListSection from './WatchListSection';


const Index = () => {
  const loading = useSelector((state: RootState) => state.movie.loading);
  const dispatch = useDispatch<AppDispatch>();
  const isLoggedIn = useSelector((state: RootState) => state.user.isLoggedIn);

  useEffect(() => {
    dispatch(fetchMovies());
    fetchCurrentPlan();
    syncStoredNotifications();
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

  const renderCarouselSkeleton = () => (
    <Box className="w-full">
      <Skeleton
        variant="rectangular"
        animation="wave"
        width="100%"
        height={400}
        sx={{ bgcolor: 'rgba(255, 255, 255, 0.06)', borderRadius: '8px' }}
      />
    </Box>
  );

  const renderMovieCardsSkeleton = () => (
    <Box className="w-full my-8">
      <Skeleton
        variant="text"
        width={200}
        height={32}
        animation="wave"
        sx={{ bgcolor: 'rgba(255, 255, 255, 0.06)', mb: 2 }}
      />
      <Box className="flex gap-4 overflow-x-hidden">
        {[...Array(8)].map((_, index) => (
          <Box
            key={index}
            style={{ minWidth: '160px' }}
          >
            <Skeleton
              variant="rectangular"
              width={160}
              height={220}
              animation="wave"
              sx={{
                bgcolor: 'rgba(255, 255, 255, 0.08)',
                borderRadius: '8px',
                mb: 1,
              }}
            />
            <Skeleton
              variant="text"
              width={120}
              height={20}
              animation="wave"
              sx={{ bgcolor: 'rgba(255, 255, 255, 0.06)' }}
            />
          </Box>
        ))}
      </Box>
    </Box>
  );

  return (
    <div className="relative w-full min-h-screen bg-black text-white">
      {!loading && (
        <div className="fixed top-0 z-50 p-4">
          <NotificationCenter />
        </div>
      )}

      {!loading && <SubscribeButton />}
      <section className="w-full mb-10">
        {loading ? (
          <>
            <LinearProgress
              variant="indeterminate"
              sx={{
                zIndex: '150',
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                height: '5px',
                '& .MuiLinearProgress-bar': {
                  backgroundColor: '#f02c49',
                },
                '&.MuiLinearProgress-root': {
                  backgroundColor: 'rgba(240, 44, 73, 0.2)',
                }
              }}
            />
            {renderCarouselSkeleton()}
          </>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            <MoodFeaturePromo />
            <MainCarousel />
          </motion.div>
        )}
      </section>

      <section className="w-full flex flex-col mb-10">
        {loading ? (
          renderMovieCardsSkeleton()
        ) : (
          <>
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
          </>
        )}
      </section>
    </div>
  );
};

export default Index;