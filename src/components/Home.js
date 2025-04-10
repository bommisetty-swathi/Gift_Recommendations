import React from 'react';
import { Box, Button, Container, Typography, Grid } from '@mui/material';
import { motion } from 'framer-motion';

const containerVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      staggerChildren: 0.2
    }
  },
  exit: {
    opacity: 0,
    y: -20,
    transition: {
      duration: 0.4
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0
  }
};

const Feature = ({ icon, title, description }) => (
  <motion.div
    variants={itemVariants}
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
  >
    <Box
      sx={{
        p: 4,
        height: '100%',
        bgcolor: 'background.paper',
        borderRadius: '24px',
        boxShadow: '0 8px 32px rgba(0,0,0,0.08)',
        transition: 'all 0.3s ease',
        '&:hover': {
          boxShadow: '0 12px 48px rgba(0,0,0,0.12)',
          transform: 'translateY(-8px)',
        },
      }}
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          mb: 2,
          width: 60,
          height: 60,
          borderRadius: '16px',
          bgcolor: 'primary.light',
          color: 'white',
          fontSize: '24px',
          fontWeight: 'bold'
        }}
      >
        {icon}
      </Box>
      <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, color: 'primary.main' }}>
        {title}
      </Typography>
      <Typography variant="body1" color="text.secondary">
        {description}
      </Typography>
    </Box>
  </motion.div>
);

const Home = ({ onGetStarted }) => {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Box sx={{ textAlign: 'center', mb: 8 }}>
          <motion.div variants={itemVariants}>
            <Typography
              variant="h1"
              sx={{
                background: 'linear-gradient(45deg, #2D3250 30%, #F6B17A 90%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                mb: 2
              }}
            >
              Find the Perfect Gift
            </Typography>
          </motion.div>
          
          <motion.div variants={itemVariants}>
            <Typography variant="h5" color="text.secondary" sx={{ mb: 4 }}>
              Let AI help you discover thoughtful and personalized gift ideas for your loved ones
            </Typography>
          </motion.div>

          <motion.div
            variants={itemVariants}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button
              variant="contained"
              color="primary"
              size="large"
              onClick={onGetStarted}
              sx={{
                py: 2,
                px: 6,
                fontSize: '1.2rem',
                boxShadow: '0 8px 32px rgba(45,50,80,0.2)',
              }}
            >
              Get Started
            </Button>
          </motion.div>
        </Box>

        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <Feature
              icon="🤖"
              title="AI-Powered Suggestions"
              description="Our advanced AI analyzes preferences and occasions to recommend the perfect gifts"
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <Feature
              icon="📈"
              title="Personalized Results"
              description="Get tailored gift ideas based on the recipient's interests and personality"
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <Feature
              icon="❤️"
              title="Thoughtful Choices"
              description="Discover unique and meaningful gifts that show you care"
            />
          </Grid>
        </Grid>
      </Container>
    </motion.div>
  );
};

export default Home;
