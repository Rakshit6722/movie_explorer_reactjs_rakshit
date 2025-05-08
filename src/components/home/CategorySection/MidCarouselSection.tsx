import React from 'react'
import { useSelector } from 'react-redux'
import MidCarousel from './MidCarousel'


type MidCarouselProps = {
    type: string
}

const MidCarouselSection = ({type}: MidCarouselProps) => {

    const movieList = useSelector((state: any) => state.movie.movies)

  return (
    <div>
      <MidCarousel movieList={movieList}/>
    </div>
  )
}

export default MidCarouselSection
