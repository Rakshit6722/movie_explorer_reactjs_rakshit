import React from 'react'
import { useSelector } from 'react-redux'
import MidCarousel from './CompactCarousel'


type MidCarouselProps = {
    type: string
}

const CompactCarouselSection = ({type}: MidCarouselProps) => {

    const movieList = useSelector((state: any) => state.movie.movies)

  return (
    <div>
      <MidCarousel movieList={movieList}/>
    </div>
  )
}

export default CompactCarouselSection
