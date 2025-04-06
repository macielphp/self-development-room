import * as React from 'react';
import { Card, CardActions, CardContent, CardMedia, Button, Typography } from '@mui/material';

export default function MediaCard({ title, description, image, onActionClick, actionLabel = 'Start' }) {
    return (
        <Card sx={{ maxWidth: 345, m: 2 }}>
            <CardMedia 
                sx={{ height: 140}}
                image={image}
                title={title}
            />
            <CardContent>
                <Typography gutterBottom variant='h5' component='div'>
                    {title}
                </Typography>
                <Typography variant='body2' sx={{ color: 'text.secondary' }}>
                    {description}
                </Typography>
            </CardContent>
            <CardActions>
                <Button size='small' onClick={onActionClick}>{actionLabel}</Button>
            </CardActions>
        </Card>
    )
}