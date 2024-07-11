import React from 'react';
import Slider from 'react-slick';
import { Box, Card, CardContent, Typography } from '@mui/material';


export default function Textxx() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1
  };
  return (
    <>
    <Box sx={{ width: '80%', margin: 'auto', mt: 5 }}>
      <Slider {...settings}>
        <Card>
          <CardContent>
          <img decoding="async" src="https://firebasestorage.googleapis.com/v0/b/imgupload-7f147.appspot.com/o/file%2Fa0893c77-84f5-4dd6-abd8-1bc54cf997c8?alt=media&token=ed808dd7-0c6c-4e8e-b4fb-93e61d5044c6" alt="Slider Image 1" title="anh 1"/>
            <Typography variant="body2">Content for Slide 1</Typography>
          </CardContent>
        </Card>
        <Card>
          <CardContent>
          <img decoding="async" src="https://firebasestorage.googleapis.com/v0/b/imgupload-7f147.appspot.com/o/file%2F58303127-3580-4a92-92f0-8ace4b284998?alt=media&token=c7811d12-62e5-4008-ad08-3655395ad78c" alt="Slider Image 1" title="anh 1"/>
            <Typography variant="body2">Content for Slide 2</Typography>
          </CardContent>
        </Card>
        <Card>
          <CardContent>
          <img decoding="async" src="https://firebasestorage.googleapis.com/v0/b/imgupload-7f147.appspot.com/o/file%2F22dc2390-129c-43d8-8a65-794468b46e84?alt=media&token=31760cff-0ef3-43f4-96ba-ca5320aa16ff" alt="Slider Image 1" title="anh 1"/>
            <Typography variant="body2">Content for Slide 3</Typography>
          </CardContent>
        </Card>
      </Slider>
    </Box>
  

    </>
  )
}
