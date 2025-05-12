import React, { useEffect, useRef } from 'react';
import { Skeleton, Box, stepButtonClasses } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import CarouselSection from './CarouselSection';
import MainCarousel from '../MainCarousel';
import MoodFeaturePromo from '../MoodSection/MoodFeaturePromo';
import MidCarousel from './CompactCarouselSection';
import { getMoviesForHomePage } from '../../../services/movieApi';
import { setLoading, setMovies } from '../../../redux/slices/movieSlice';
import SubscribeButton from './SubscribeButton';
import { motion } from 'framer-motion';
import { getSubscriptionDetailsApi } from '../../../services/api';
import { setCurrentPlan } from '../../../redux/slices/userSlice';
import NotificationCenter from '../../notification/NotificationCenter'
import { addNotification } from '../../../redux/slices/notificationSlice';
import { toast } from 'react-toastify';


const Index = () => {
  const loading = useSelector((state: any) => state.movie.loading);
  const containerRef = useRef<HTMLDivElement>(null);
  const dispatch = useDispatch();


  useEffect(() => {
    fetchHomeMovies();
    currentFetchPlan()
    syncStoredNotifications();
    if (containerRef.current) {
      containerRef.current.scrollIntoView({ behavior: 'smooth' });
    }

    const style = document.createElement('style');
    style.innerHTML = `
      @keyframes flicker {
        0% { opacity: 1 }
        50% { opacity: 0.55 }
        60% { opacity: 0.85 }
        70% { opacity: 0.55 }
        80% { opacity: 0.85 }
        100% { opacity: 1 }
      }
      .flicker-effect {
        animation: flicker 2s infinite ease-in-out;
      }
    `;
    document.head.appendChild(style);

    return () => {
      document.head.removeChild(style);
    };
  }, []);

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

  const fetchHomeMovies = async () => {

    dispatch(setLoading(true));
    try {
      const data = await getMoviesForHomePage();
      if (data) dispatch(setMovies(data));
    } catch (err: any) {
      toast.error(err?.message || "Couldn't fetch movies");
    } finally {
      dispatch(setLoading(false));
    }
  };

  const currentFetchPlan = async () => {
    try {
      const response = await getSubscriptionDetailsApi()
      if (response) {
        if (response?.status === 'pending') {
          dispatch(setCurrentPlan("Basic"));
          return
        }
        dispatch(setCurrentPlan(response?.plan))
      }
    } catch (err: any) {
      toast.error(err?.message || "Couldn't fetch subscription details");
    }
  }

  const renderCarouselSkeleton = () => (
    <Box className="w-full flicker-effect">
      <Skeleton
        variant="rectangular"
        animation="wave"
        width="100%"
        height={500}
        sx={{ bgcolor: 'rgba(255, 255, 255, 0.06)', borderRadius: '8px' }}
      />
    </Box>
  );

  const renderMovieCardsSkeleton = () => (
    <Box className="w-full my-12">
      <Skeleton
        variant="text"
        width={200}
        height={32}
        animation="wave"
        sx={{ bgcolor: 'rgba(255, 255, 255, 0.06)', mb: 3 }}
        className="flicker-effect"
      />
      <Box className="flex gap-4 overflow-x-hidden">
        {[...Array(10)].map((_, index) => (
          <Box
            key={index}
            className="flicker-effect"
            style={{ animationDelay: `${index * 0.1}s`, minWidth: '180px' }}
          >
            <Skeleton
              variant="rectangular"
              width={180}
              height={270}
              animation="wave"
              sx={{
                bgcolor: 'rgba(255, 255, 255, 0.08)',
                borderRadius: '8px',
                mb: 1,
              }}
            />
            <Skeleton
              variant="text"
              width={140}
              height={20}
              animation="wave"
              sx={{ bgcolor: 'rgba(255, 255, 255, 0.06)' }}
            />
            <Skeleton
              variant="text"
              width={100}
              height={16}
              animation="wave"
              sx={{ bgcolor: 'rgba(255, 255, 255, 0.04)' }}
            />
          </Box>
        ))}
      </Box>
    </Box>
  );

  const scrollAnimProps = {
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    transition: { duration: 0.5 },
    viewport: { once: true, amount: 0.1 },
    style: { zIndex: 1, willChange: 'transform, opacity' },
  };

  return (
    <div ref={containerRef} className="relative w-full min-h-screen bg-black text-white">
    {!loading && (
      <div className="fixed top-0  z-50 p-4">
        <NotificationCenter />
      </div>
    )}

      {!loading && <SubscribeButton />}
      <section className="w-full mb-12">
        {loading ? (
          renderCarouselSkeleton()
        ) : (
          <motion.div {...scrollAnimProps}>
            <MoodFeaturePromo />
            <MainCarousel />
          </motion.div>
        )}
      </section>

      <section className="w-full flex flex-col mb-12">
        {loading ? (
          <>
            {renderMovieCardsSkeleton()}
            {renderMovieCardsSkeleton()}
            {renderMovieCardsSkeleton()}
          </>
        ) : (
          <>
            {/* <motion.div {...scrollAnimProps} className="mb-8">
              <ParallaxText baseVelocity={-5}>Movie Explorer</ParallaxText>
              <ParallaxText baseVelocity={5}>Explorer Movie</ParallaxText>
            </motion.div> */}
            <motion.div {...scrollAnimProps} className="mb-8">
              <CarouselSection type="Trending" heading="Top Trending" />
            </motion.div>
            <motion.div {...scrollAnimProps} className="mb-8">
              <CarouselSection type="NewRelease" heading="New Release" />
            </motion.div>
            <motion.div {...scrollAnimProps} className="mb-8">
              <CarouselSection type="FanFavourite" heading="Fan Favourite" />
            </motion.div>
            <motion.div {...scrollAnimProps} className="mb-8">
              <MidCarousel type="MidCarousel" />
            </motion.div>
            <motion.div {...scrollAnimProps} className="mb-8">
              <CarouselSection type="Mood" heading="Find By Mood" />
            </motion.div>
            <motion.div {...scrollAnimProps} className="mb-8">
              <CarouselSection type="Action" heading="Action Packed" />
            </motion.div>
            <motion.div {...scrollAnimProps} className="mb-8">
              <CarouselSection type="Horror" heading="Horror Nights" />
            </motion.div>
          </>
        )}
      </section>
    </div>
  );
};

export default Index;
