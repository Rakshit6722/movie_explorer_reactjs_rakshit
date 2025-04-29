import { createSlice } from "@reduxjs/toolkit"
import { Movie } from "../../types/type";


const initialState: {
    movies: Movie[];
    loading: boolean;
    error: string | null;
} = {
    movies: [
        {
            "id": 1,
            "title": "Edge of Tomorrow",
            "genre": ["Action", "Sci-Fi"],
            "release_year": "2014",
            "rating": "8.0",
            "director": "Doug Liman",
            "duration": "1h 53m",
            "description": "A soldier relives the same day over and over again in a war against aliens.",
            "poster": "https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcRute--pNVdX7oKA1SVN6i3qqXOFRhsMGKtdlwxrHhQKz-SWbNI_QNUUAzfrow0TugyYR2T9Q",
            "coverimage": "https://i0.wp.com/thenerdsofcolor.org/wp-content/uploads/2014/06/edge_of_tomorrow_2014_movie-wide.jpg?fit=1440%2C900&ssl=1"
        },
        {
            "id": 2,
            "title": "La La Land",
            "genre": ["Romance", "Drama", "Music"],
            "release_year": "2016",
            "rating": "8.1",
            "director": "Damien Chazelle",
            "duration": "2h 8m",
            "description": "While navigating their careers in Los Angeles, a musician and an actress fall in love.",
            "poster": "https://image.tmdb.org/t/p/w500/uDO8zWDhfWwoFdKS4fzkUJt0Rf0.jpg",
            "coverimage": "https://images.tntdrama.com/tnt/$dyna_params/https%3A%2F%2Fi.cdn.tntdrama.com%2Fassets%2Fimages%2F2022%2F09%2FLaLaLand-1600x900.jpg"
        },
        {
            "id": 3,
            "title": "Inception",
            "genre": ["Sci-Fi", "Thriller"],
            "release_year": "2010",
            "rating": "8.8",
            "director": "Christopher Nolan",
            "duration": "2h 28m",
            "description": "A thief who steals corporate secrets through dream-sharing technology is given the inverse task of planting an idea.",
            "poster": "https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcRRyuWmayVBvqjd1MxTKpRgauq2cCtUzb7Q9QvaFTkAuxAU_EYMoCE3wBuJeftxIzf0grreIw",
            "coverimage": "https://image.tmdb.org/t/p/original/s3TBrRGB1iav7gFOCNx3H31MoES.jpg"
        },
        {
            "id": 4,
            "title": "The Pursuit of Happyness",
            "genre": ["Drama", "Biography"],
            "release_year": "2006",
            "rating": "8.0",
            "director": "Gabriele Muccino",
            "duration": "1h 57m",
            "description": "A struggling salesman takes custody of his son as he's poised to begin a life-changing professional career.",
            "poster": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSW5mDPXOgS6E_2LJECbHxPT1x6s9Dv__YWcdkPw4Qr7lJ3QK3D7TXko5fj_D9ng1ka1prv",
            "coverimage": "https://ntvb.tmsimg.com/assets/p162523_v_h8_ag.jpg?w=1280&h=720"
        },
        {
            "id": 5,
            "title": "Interstellar",
            "genre": ["Adventure", "Drama", "Sci-Fi"],
            "release_year": "2014",
            "rating": "8.6",
            "director": "Christopher Nolan",
            "duration": "2h 49m",
            "description": "A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival.",
            "poster": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSngBJ0B7UDrLUkDlp6DCQLsEYuWR-DiHwbnxFFCniB3HiP3f3NZmR1-lKSC34ge6YXu4LX",
            "coverimage": "https://gugimages.s3.us-east-2.amazonaws.com/wp-content/uploads/2014/11/23074458/Interstellar-IMAX-Poster-Wallpaper.jpg"
        },
        {
            "id": 6,
            "title": "Joker",
            "genre": ["Crime", "Drama", "Thriller"],
            "release_year": "2019",
            "rating": "8.4",
            "director": "Todd Phillips",
            "duration": "2h 2m",
            "description": "In Gotham's fractured society, a mentally troubled comedian embarks on a downward spiral of revolution and bloody crime.",
            "poster": "https://image.tmdb.org/t/p/w500/udDclJoHjfjb8Ekgsd4FDteOkCU.jpg",
            "coverimage": "https://image.tmdb.org/t/p/original/n6bUvigpRFqSwmPp1m2YADdbRBc.jpg"
        },
        {
            "id": 7,
            "title": "The Dark Knight",
            "genre": ["Action", "Crime", "Drama"],
            "release_year": "2008",
            "rating": "9.0",
            "director": "Christopher Nolan",
            "duration": "2h 32m",
            "description": "Batman faces the Joker, a criminal mastermind who plunges Gotham into chaos.",
            "poster": "https://image.tmdb.org/t/p/w500/qJ2tW6WMUDux911r6m7haRef0WH.jpg",
            "coverimage": "https://image.tmdb.org/t/p/original/hqkIcbrOHL86UncnHIsHVcVmzue.jpg"
        },
        {
            "id": 8,
            "title": "Avatar",
            "genre": ["Action", "Adventure", "Fantasy"],
            "release_year": "2009",
            "rating": "7.9",
            "director": "James Cameron",
            "duration": "2h 42m",
            "description": "A paraplegic Marine is dispatched to the moon Pandora on a unique mission.",
            "poster": "https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcTwJPOxfRiaHwXkICnf6LKMHIPWJPGLx8wht-wZH-qFs0OXXUCBvOeCQTs79z7Bx9odsdsB",
            "coverimage": "https://image.tmdb.org/t/p/original/6EiRUJpuoeQPghrs3YNktfnqOVh.jpg"
        },
        {
            "id": 9,
            "title": "The Matrix",
            "genre": ["Sci-Fi", "Action"],
            "release_year": "1999",
            "rating": "8.7",
            "director": "Lana Wachowski, Lilly Wachowski",
            "duration": "2h 16m",
            "description": "A computer hacker learns about the true nature of his reality and his role in the war against its controllers.",
            "poster": "https://image.tmdb.org/t/p/w500/f89U3ADr1oiB1s9GkdPOEpXUk5H.jpg",
            "coverimage": "https://image.tmdb.org/t/p/original/9TGHDvWrqKBzwDxDodHYXEmOE6J.jpg"
        },
        {
            "id": 10,
            "title": "Gladiator",
            "genre": ["Action", "Adventure", "Drama"],
            "release_year": "2000",
            "rating": "8.5",
            "director": "Ridley Scott",
            "duration": "2h 35m",
            "description": "A former Roman General sets out to exact vengeance against the corrupt emperor who murdered his family.",
            "poster": "https://miro.medium.com/v2/resize:fit:1400/0*TxZdqJf0MQ2mdL9p.jpg",
            "coverimage": "https://image.tmdb.org/t/p/original/ty8TGRuvJLPUmAR1H1nRIsgwvim.jpg"
        },
        {
            "id": 11,
            "title": "The Wolf of Wall Street",
            "genre": ["Biography", "Crime", "Drama"],
            "release_year": "2013",
            "rating": "8.2",
            "director": "Martin Scorsese",
            "duration": "3h 0m",
            "description": "Based on the true story of Jordan Belfort's rise and fall on Wall Street.",
            "poster": "https://image.tmdb.org/t/p/w500/sOxr33wnRuKazR9ClHek73T8qnK.jpg",
            "coverimage": "https://image.tmdb.org/t/p/original/bKxiLRPVWe2nZXCzt6JPr5HNWYm.jpg"
        },
        {
            "id": 12,
            "title": "Avengers: Endgame",
            "genre": ["Action", "Adventure", "Drama"],
            "release_year": "2019",
            "rating": "8.4",
            "director": "Anthony Russo, Joe Russo",
            "duration": "3h 2m",
            "description": "The Avengers assemble once more to undo Thanos' actions and restore balance to the universe.",
            "poster": "https://image.tmdb.org/t/p/w500/or06FN3Dka5tukK1e9sl16pB3iy.jpg",
            "coverimage": "https://image.tmdb.org/t/p/original/ulzhLuWrPK07P1YkdWQLZnQh1JL.jpg"
        },
        {
            "id": 13,
            "title": "Parasite",
            "genre": ["Thriller", "Drama"],
            "release_year": "2019",
            "rating": "8.5",
            "director": "Bong Joon-ho",
            "duration": "2h 12m",
            "description": "Greed and class discrimination threaten the newly formed symbiotic relationship between the wealthy and the destitute.",
            "poster": "https://image.tmdb.org/t/p/w500/7IiTTgloJzvGI1TAYymCfbfl3vT.jpg",
            "coverimage": "https://image.tmdb.org/t/p/original/ApiBzeaa95TNYliSbQ8pJv4Fje7.jpg"
        },
        {
            "id": 14,
            "title": "The Social Network",
            "genre": ["Drama", "Biography"],
            "release_year": "2010",
            "rating": "7.7",
            "director": "David Fincher",
            "duration": "2h 0m",
            "description": "The story of the founders of Facebook and the resulting lawsuits.",
            "poster": "https://image.tmdb.org/t/p/w500/n0ybibhJtQ5icDqTp8eRytcIHJx.jpg",
            "coverimage": "https://image.tmdb.org/t/p/original/jW2G97T4y3ov1L8JxG8yXZVsH67.jpg"
        },
        {
            "id": 15,
            "title": "Whiplash",
            "genre": ["Drama", "Music"],
            "release_year": "2014",
            "rating": "8.5",
            "director": "Damien Chazelle",
            "duration": "1h 47m",
            "description": "A promising young drummer enrolls at a cut-throat music conservatory.",
            "poster": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQfMrzXyHwhlsfpQ4Lo69gYh2SPU_RO_3i1qgmWBALUJkEySSHc6DK7Z-SSlh3zGhsqZpJD6g",
            "coverimage": "https://image.tmdb.org/t/p/original/lIv1QinFqz4dlp5U4lQ6HaiskOZ.jpg"
        },
        {
            "id": 16,
            "title": "Pathaan",
            "genre": ["Action", "Thriller"],
            "release_year": "2023",
            "rating": "7.0",
            "director": "Siddharth Anand",
            "duration": "2h 26m",
            "description": "An exiled RAW agent must stop a ruthless mercenary who threatens India's security.",
            "poster": "https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcTIOHA0DTAKNAhDRUKyhxR2U6iokt9boztD3ur53XbnoOGkzBm9C-qckStDmlMnJZvYDFAM",
            "coverimage": "https://image.tmdb.org/t/p/original/wjOHjWCUE0YzDiEzKv8AfqHj3ir.jpg"
        },
        {
            "id": 17,
            "title": "Animal",
            "genre": ["Action", "Drama"],
            "release_year": "2023",
            "rating": "7.5",
            "director": "Sandeep Reddy Vanga",
            "duration": "3h 21m",
            "description": "The complex relationship between a father and son leads to violence and emotional conflict.",
            "poster": "https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcT_ucWGXsn7q9pI6kgi1ZqsI_MsylRX2yQVF0_jRw99HgAozEZIG6qfAogFeBp1jVi3c-p6",
            "coverimage": "https://image.tmdb.org/t/p/original/ts1j6zrxkzUNas5oW63tsWSiy6X.jpg"
        },
        {
            "id": 18,
            "title": "Jawan",
            "genre": ["Action", "Thriller"],
            "release_year": "2023",
            "rating": "7.2",
            "director": "Atlee",
            "duration": "2h 49m",
            "description": "A man is driven by a personal vendetta to rectify the wrongs in society, while keeping a promise made years ago.",
            "poster": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR3giEteXGggow1hYtpRIuy3bDLO_Z9aoximYp_tuFK0Bb0N_fnmPaChKv1l_mgBxiiOwN3",
            "coverimage": "https://image.tmdb.org/t/p/original/2pmlU1dNH5gCjePV1mP1dU7E8kP.jpg"
        },
        {
            "id": 19,
            "title": "Dunki",
            "genre": ["Comedy", "Drama"],
            "release_year": "2023",
            "rating": "7.4",
            "director": "Rajkumar Hirani",
            "duration": "2h 41m",
            "description": "A man and his friends plan to illegally immigrate to the UK using a risky method called 'Donkey Flight'.",
            "poster": "https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcQxkby84bRNSkgl3IjPwQy1QaWyENYytNUn4h0jG4l4WJv3hV8VEh67Y_wFw9dgmrfSCVHWIw",
            "coverimage": "https://image.tmdb.org/t/p/original/fA3mtVoQWb9oiij1e7nyPzcnVxE.jpg"
        },
        {
            "id": 20,
            "title": "Oppenheimer",
            "genre": ["Biography", "Drama", "History"],
            "release_year": "2023",
            "rating": "8.5",
            "director": "Christopher Nolan",
            "duration": "3h 0m",
            "description": "The story of J. Robert Oppenheimer and the creation of the atomic bomb.",
            "poster": "https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcQ8FFJNBaIXvhEwqXXw40rYYDci8jPlYxWfy9082flliYoZ-SqqZjy0az-G5rIWuSJp2pn7xQ",
            "coverimage": "https://image.tmdb.org/t/p/original/pFqHODw3mRrx8ShzU5sFOfZgAdc.jpg"
        },
        {
            "id": 21,
            "title": "Barbie",
            "genre": ["Adventure", "Comedy", "Fantasy"],
            "release_year": "2023",
            "rating": "6.9",
            "director": "Greta Gerwig",
            "duration": "1h 54m",
            "description": "Barbie suffers a crisis that leads her to question her world and her existence.",
            "poster": "https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcROuK_Bl8jrLUP7fo3hsDC4XC2AC1WR1CAXS3G1SVqDPZE0pgFTQKnr8P2_cKmRuXg03nPE",
            "coverimage": "https://image.tmdb.org/t/p/original/iuFNMS8U5cb6xfzi51Dbkovj7vM.jpg"
        },
        {
            "id": 22,
            "title": "12th Fail",
            "genre": ["Drama", "Biography"],
            "release_year": "2023",
            "rating": "9.2",
            "director": "Vidhu Vinod Chopra",
            "duration": "2h 26m",
            "description": "A young man from a small village struggles against all odds to become an IPS officer.",
            "poster": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSTZYCGCvRZc8wlVNJiqa-2-U4GXx0SgyNclhbCfMaRIkA4Q0wnCgkYm6sjPsk3HgdByweG",
            "coverimage": "https://image.tmdb.org/t/p/original/ybNNjS7ugMzblLo4h0vYf9fbQnL.jpg"
        },
        {
            "id": 23,
            "title": "Killers of the Flower Moon",
            "genre": ["Crime", "Drama", "History"],
            "release_year": "2023",
            "rating": "7.7",
            "director": "Martin Scorsese",
            "duration": "3h 26m",
            "description": "Members of the Osage tribe are murdered under mysterious circumstances, sparking a major FBI investigation.",
            "poster": "https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcQn_mCo1bDq8dZY9qzR7V59hsQ6Xkgv0FCNpTvDlkwctzuJZ5O4BBCN86duJl9J1kTTb_XoZw",
            "coverimage": "https://image.tmdb.org/t/p/original/dB6Krk806zeqd0YNp2ngQ9zXteH.jpg"
        },
        {
            "id": 24,
            "title": "Leo",
            "genre": ["Action", "Thriller"],
            "release_year": "2023",
            "rating": "7.5",
            "director": "Lokesh Kanagaraj",
            "duration": "2h 44m",
            "description": "A café owner’s past resurfaces, dragging him into violent conflicts he thought he had left behind.",
            "poster": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSZorcQ8q5HnwPB8MfA2I7-_BLk92pyAYlV5GPh9RvyznAjCBCzHs7LwdNVnJ3eELehoQSk",
            "coverimage": "https://image.tmdb.org/t/p/original/jTKrCjWZjhUzYKXtS1sIYMErAeW.jpg"
        },
        {
            "id": 25,
            "title": "Guardians of the Galaxy Vol. 3",
            "genre": ["Action", "Adventure", "Comedy"],
            "release_year": "2023",
            "rating": "7.9",
            "director": "James Gunn",
            "duration": "2h 30m",
            "description": "The Guardians embark on a mission to protect Rocket and face powerful enemies in the process.",
            "poster": "https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcRkyKX8165zgrg_ded57Dq66MKQsx7K8VNHyCB4u7Kbm5qJgv5Sh6WO-oPi2oCnsVbsRicm",
            "coverimage": "https://image.tmdb.org/t/p/original/r2J02Z2OpNTctfOSN1Ydgii51I3.jpg"
        }

    ]

    ,
    loading: false,
    error: null,
}

const movieSlice = createSlice({
    name: "movies",
    initialState,
    reducers: {
        setMovies(state, action) {
            state.movies = action.payload
        },
        setLoading(state, action) {
            state.loading = action.payload
        },
        setError(state, action) {
            state.error = action.payload
        },
        addMovie(state, action) {
            state.movies.push(action.payload)
        },
        removeMovie(state, action) {
            state.movies = state.movies.filter(movie => movie.id !== action.payload)
        },
        updateMovie(state, action) {
            const index = state.movies.findIndex(movie => movie.id === action.payload.id)
            if (index !== -1) {
                state.movies[index] = { ...state.movies[index], ...action.payload }
            }
        }
    }
})


export const { setMovies, setLoading, setError, addMovie, removeMovie, updateMovie } = movieSlice.actions
export default movieSlice.reducer