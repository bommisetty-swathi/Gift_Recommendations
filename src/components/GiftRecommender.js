import React, { useState } from 'react';
import {
  Box,
  TextField,
  Button,
  Typography,
  Card,
  Grid,
  FormControl,
  Select,
  MenuItem,
  Paper,
  IconButton,
  Container,
} from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.5 } },
  exit: { opacity: 0, transition: { duration: 0.5 } },
};

const formVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const itemVariants = {
  hidden: { opacity: 0, x: 50 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.5 } },
  exit: { opacity: 0, x: -50, transition: { duration: 0.3 } },
};

const GiftRecommender = ({ onBack }) => {
  const [recipient, setRecipient] = useState('');
  const [occasion, setOccasion] = useState('');
  const [description, setDescription] = useState('');
  const [interests, setInterests] = useState('');
  const [additionalInfo, setAdditionalInfo] = useState('');
  const [step, setStep] = useState(1);
  const [recommendations, setRecommendations] = useState([]);
  const [currentRecommendation, setCurrentRecommendation] = useState(0);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const prompt = `Based on the following information, suggest personalized gift ideas:
        Recipient: ${recipient}
        Occasion: ${occasion}
        Description: ${description}
        Interests: ${interests}
        Additional Info: ${additionalInfo}
        
        Please suggest 5 specific gift ideas with brief descriptions and why they would be good choices.`;

      const response = await axios.post('https://api.openai.com/v1/chat/completions', {
        model: "gpt-3.5-turbo",
        messages: [{
          role: "user",
          content: prompt
        }],
      }, {
        headers: {
          'Authorization': `Bearer ${process.env.REACT_APP_OPENAI_API_KEY}`,
          'Content-Type': 'application/json',
        },
      });

      const suggestions = response.data.choices[0].message.content
        .split(/\d+\./)
        .filter(item => item.trim())
        .map(item => {
          const [title, ...descParts] = item.split(':');
          return {
            title: title.trim(),
            description: descParts.join(':').trim()
          };
        });

      setRecommendations(suggestions);
      setStep(2);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleNext = () => {
    if (currentRecommendation < recommendations.length - 1) {
      setCurrentRecommendation(prev => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (currentRecommendation > 0) {
      setCurrentRecommendation(prev => prev - 1);
    }
  };

  return (
    <Container maxWidth="md">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
      >
        <IconButton
          onClick={onBack}
          sx={{ mb: 2 }}
          color="primary"
        >
          ←
        </IconButton>

        {step === 1 ? (
          <motion.div variants={formVariants}>
            <Typography variant="h4" gutterBottom color="primary" align="center"
              sx={{
                background: 'linear-gradient(45deg, #2D3250 30%, #F6B17A 90%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                mb: 4
              }}
            >
              Tell us about the gift recipient
            </Typography>

            <Paper 
              component="form" 
              onSubmit={handleSubmit}
              sx={{
                p: 4,
                background: 'rgba(255, 255, 255, 0.9)',
                backdropFilter: 'blur(10px)',
              }}
            >
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <FormControl fullWidth sx={{ mb: 3 }}>
                    <Typography variant="subtitle1" gutterBottom>Who is the recipient?</Typography>
                    <Select
                      name="recipient"
                      value={recipient}
                      onChange={(e) => setRecipient(e.target.value)}
                      displayEmpty
                      sx={{ borderRadius: 3 }}
                    >
                      <MenuItem value="">Select an option</MenuItem>
                      <MenuItem value="family">Family Member</MenuItem>
                      <MenuItem value="friend">Friend</MenuItem>
                      <MenuItem value="colleague">Colleague</MenuItem>
                      <MenuItem value="partner">Partner</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>

                <Grid item xs={12}>
                  <FormControl fullWidth sx={{ mb: 3 }}>
                    <Typography variant="subtitle1" gutterBottom>What is the occasion?</Typography>
                    <TextField
                      name="occasion"
                      value={occasion}
                      onChange={(e) => setOccasion(e.target.value)}
                      fullWidth
                      sx={{ bgcolor: 'background.paper' }}
                    />
                  </FormControl>
                </Grid>

                <Grid item xs={12}>
                  <FormControl fullWidth sx={{ mb: 3 }}>
                    <Typography variant="subtitle1" gutterBottom>How would you describe the recipient?</Typography>
                    <TextField
                      name="description"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      multiline
                      rows={3}
                      fullWidth
                      sx={{ bgcolor: 'background.paper' }}
                    />
                  </FormControl>
                </Grid>

                <Grid item xs={12}>
                  <FormControl fullWidth sx={{ mb: 3 }}>
                    <Typography variant="subtitle1" gutterBottom>What are the recipient's interests?</Typography>
                    <TextField
                      name="interests"
                      value={interests}
                      onChange={(e) => setInterests(e.target.value)}
                      fullWidth
                      sx={{ bgcolor: 'background.paper' }}
                    />
                  </FormControl>
                </Grid>

                <Grid item xs={12}>
                  <FormControl fullWidth sx={{ mb: 3 }}>
                    <Typography variant="subtitle1" gutterBottom>Any other information to consider?</Typography>
                    <TextField
                      name="additionalInfo"
                      value={additionalInfo}
                      onChange={(e) => setAdditionalInfo(e.target.value)}
                      multiline
                      rows={3}
                      fullWidth
                      sx={{ bgcolor: 'background.paper' }}
                    />
                  </FormControl>
                </Grid>
              </Grid>

              <Box sx={{ mt: 4, display: 'flex', justifyContent: 'center' }}>
                <Button
                  type="submit"
                  variant="contained"
                  size="large"
                  disabled={loading}
                  sx={{ minWidth: 200 }}
                >
                  {loading ? 'Generating Ideas...' : 'Get Gift Ideas'}
                </Button>
              </Box>
            </Paper>
          </motion.div>
        ) : (
          <motion.div
            variants={formVariants}
            initial="hidden"
            animate="visible"
          >
            <Typography 
              variant="h3" 
              align="center" 
              gutterBottom 
              sx={{
                background: 'linear-gradient(45deg, #2D3250 30%, #F6B17A 90%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                mb: 1
              }}
            >
              Perfect Gift Ideas
            </Typography>
            
            <Typography 
              variant="subtitle1" 
              align="center" 
              sx={{ mb: 4, color: 'text.secondary' }}
            >
              Swipe through our handpicked recommendations
            </Typography>

            <Box sx={{ position: 'relative', minHeight: '400px' }}>
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentRecommendation}
                  variants={itemVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  style={{ position: 'absolute', width: '100%' }}
                >
                  <Card
                    sx={{
                      p: 4,
                      background: 'rgba(255, 255, 255, 0.9)',
                      backdropFilter: 'blur(10px)',
                      border: '1px solid rgba(255, 255, 255, 0.2)',
                      boxShadow: '0 8px 32px rgba(0,0,0,0.08)',
                      position: 'relative',
                      overflow: 'hidden',
                    }}
                  >
                    <Box
                      sx={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        height: '200px',
                        background: `linear-gradient(45deg, ${currentRecommendation % 2 === 0 ? '#2D3250' : '#F6B17A'} 0%, ${currentRecommendation % 2 === 0 ? '#424769' : '#F7C59F'} 100%)`,
                        opacity: 0.1,
                      }}
                    />
                    
                    <Box sx={{ position: 'relative' }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                        <Typography 
                          variant="h1" 
                          sx={{ 
                            fontSize: '3rem',
                            mr: 2,
                            background: 'linear-gradient(45deg, #2D3250 30%, #F6B17A 90%)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                          }}
                        >
                          🎁
                        </Typography>
                        <Typography 
                          variant="h4" 
                          sx={{ 
                            fontWeight: 600,
                            color: 'primary.main',
                            background: 'linear-gradient(45deg, #2D3250 30%, #F6B17A 90%)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                          }}
                        >
                          {recommendations[currentRecommendation].title}
                        </Typography>
                      </Box>

                      <Typography 
                        variant="body1" 
                        sx={{ 
                          mb: 4,
                          color: 'text.secondary',
                          lineHeight: 1.8,
                          fontSize: '1.1rem'
                        }}
                      >
                        {recommendations[currentRecommendation].description}
                      </Typography>

                      <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 4 }}>
                        <Button
                          onClick={handlePrevious}
                          disabled={currentRecommendation === 0}
                          variant="outlined"
                          sx={{ minWidth: 120 }}
                        >
                          Previous
                        </Button>
                        <Typography 
                          sx={{ 
                            alignSelf: 'center',
                            fontWeight: 600,
                            color: 'text.secondary'
                          }}
                        >
                          {currentRecommendation + 1} of {recommendations.length}
                        </Typography>
                        <Button
                          onClick={handleNext}
                          disabled={currentRecommendation === recommendations.length - 1}
                          variant="contained"
                          sx={{ minWidth: 120 }}
                        >
                          Next
                        </Button>
                      </Box>
                    </Box>
                  </Card>
                </motion.div>
              </AnimatePresence>
            </Box>

            <Box sx={{ mt: 4, display: 'flex', justifyContent: 'center' }}>
              <Button
                variant="outlined"
                onClick={() => setStep(1)}
                sx={{ minWidth: 200 }}
              >
                Start Over
              </Button>
            </Box>
          </motion.div>
        )}
      </motion.div>
    </Container>
  );
};

export default GiftRecommender;
