import React from 'react';
import Carousel from 'react-material-ui-carousel'
import { Paper, Button, Container, Grid, Typography } from '@mui/material'
import { alpha, styled } from '@mui/material/styles';
import Img1 from 'src/assets/images/slider/img1.png'
import Img2 from 'src/assets/images/slider/img2.png'
import Img3 from 'src/assets/images/slider/img3.png'


const PaperOuterStyle = styled(Paper)(({ theme }) => ({
    width: '100%',
    height: 500,
    position:'relative',
    borderRadius: 0,
    background: '#ffffff',
    marginTop: 30
}));

const PaperInnerStyle = styled(Paper)(({ theme }) => ({
    width: '100%',
    height: 500,
    verticalAlign: 'center',
    zIndex:99,
    borderRadius: 0
}));

const GridStyle = styled(Grid)(({ theme }) => ({
    margin: 'auto',
}));

const ImageStyle = styled('img')(({ theme }) => ({
    width: '100%',
}));


const Slider = () => {
const classes = {};

const items = [
    {
        name: 'Your Credit Score & Report',
        description: 'Your credit score is more than just a number. It’s the key to help you unlock the doors to the best loans & credit card offers available',
        image: Img1,
    },
    {
        name: 'Your Credit Score & Report',
        description: 'Your credit score is more than just a number. It’s the key to help you unlock the doors to the best loans & credit card offers available',
        image: Img2,
    },
    {
        name: 'Your Credit Score & Report',
        description: 'Your credit score is more than just a number. It’s the key to help you unlock the doors to the best loans & credit card offers available',
        image: Img3,
    },
];

return (
    <Carousel>
        {items.map((item, i) => (
            <PaperOuterStyle key={i} >                
                <PaperInnerStyle>
                    <Container maxWidth="lg" >
                        <Grid container spacing={4}>
                            <GridStyle item md={6} >
                                <Paper style={{ marginRight : '45px' }}>
                                    <Typography variant="h2" component="h2">
                                        {item.name}
                                    </Typography>
                                    <Typography variant="h5" component="h5">
                                        {item.description}
                                    </Typography>
                                </Paper>                  
                            </GridStyle>
                            <Grid item md={6}>
                                <ImageStyle src={item.image} />
                            </Grid>
                        </Grid>
                    </Container>
                </PaperInnerStyle>
            </PaperOuterStyle>
        ))}
    </Carousel>
);
}

export default Slider
