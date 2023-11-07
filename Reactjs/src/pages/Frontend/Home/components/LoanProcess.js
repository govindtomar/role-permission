import React from 'react';
// import Carousel from 'react-material-ui-carousel'
import { Paper, Button, Container, Grid, Typography } from '@mui/material'
import { styled, alpha } from '@mui/material/styles';
import SeactionHeader from 'src/pages/Frontend/components/SectionHeader';
import Iconify from 'src/components/Iconify';


const PaperStyle = styled(Paper)(({ theme }) => ({
    backgroundColor: alpha(theme.palette.primary.main, 0.05),
    paddingTop:30,
    paddingBottom:40
}));

const ContentWrapPaperStyle = styled(Paper)(({ theme }) => ({
        // margin: 'auto',
        textAlign: 'center',
        padding: '30px 10px',
        // boxShadow: `0px 4px 11px 1px ${alpha(theme.palette.primary.main, 0.20)}`,
        background: 'transparent'
}));

const IconifyStyle = styled(Iconify)(({ theme }) => ({
    // backgroundColor: alpha(theme.palette.primary.main, 0.10),
    // borderRadius:'50%',
    // padding:15,
    color: alpha(theme.palette.primary.main, 1),
    fontSize:50
}));

const TypographyTitleStyle = styled(Typography)(({ theme }) => ({
    paddingBottom: 20,
    paddingTop:15
}));

const TypographyCountStyle = styled(Typography)(({ theme }) => ({
    backgroundColor: alpha(theme.palette.common.black, .5),
    borderRadius:'50%',
    padding:8,
    margin:'auto',
    marginTop:30,
    width:45,
    height:45,
    color:theme.palette.common.white
}));


const Slider = () => {

const items = [
    {
        name: 'Choose Loan Amount',
        description: 'Choose your loan amount and terms to use loan',
        image: "la:pen-fancy",
    },
    {
        name: 'Provide Document',
        description: 'Need to provide some basic document to verification',
        image: "la:id-card-solid",
    },
    {
        name: 'Approved Loan',
        description: 'Our loan specialist ask fews question and verify docuements.',
        image: "la:check-double",
    },
    {
        name: 'Get your Money',
        description: 'Once loan aprroved you get loan amount credit.',
        image: "la:money-bill-wave-alt",
    },
];

return (
    <PaperStyle>
        <Container maxWidth="lg">
            <SeactionHeader header="Simple Loan Process" />
            <Grid container spacing={3}>
                {items.map((item, i) => (                
                    <Grid item md={3}  key={i}>
                        <ContentWrapPaperStyle>
                            <IconifyStyle icon={item.image} height={75} />
                            <TypographyTitleStyle variant="h5" component="h3">
                                {item.name}
                            </TypographyTitleStyle>
                            <Typography variant="p" component="p">
                                {item.description}
                            </Typography>
                            <TypographyCountStyle variant="h5" component="h3">
                                {i+1}
                            </TypographyCountStyle>
                        </ContentWrapPaperStyle>                  
                    </Grid>                
                ))}
            </Grid>
        </Container>
    </PaperStyle>
);
}

export default Slider
