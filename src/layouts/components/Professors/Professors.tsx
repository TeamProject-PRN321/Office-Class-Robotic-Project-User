import * as React from 'react'

import { Autocomplete, Box, Button, Card, Typography } from '@mui/material'
import { BookmarkCheckOutline } from 'mdi-material-ui'
import moment from 'moment'
import { TeacherModel } from 'src/pages/teachers'

import TextField from '@mui/material/TextField'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import Radio from '@mui/material/Radio'
import RadioGroup from '@mui/material/RadioGroup'
import FormControlLabel from '@mui/material/FormControlLabel'
import FormControl from '@mui/material/FormControl'
import FormLabel from '@mui/material/FormLabel'

interface ProfessorItemsProps {
  teacherModel: TeacherModel
  onClickViewDetail: (value: TeacherModel) => void
}

export default function ProfessorItems({ teacherModel, onClickViewDetail }: ProfessorItemsProps) {
  const [open, setOpen] = React.useState(false)

  const handleClose = () => {
    setOpen(false)
  }

  return (
    <Card sx={{ padding: '15px', display: 'flex', gap: 3, flexDirection: 'column', width: '350px', height: '200px' }}>
      <Typography sx={{ color: 'black', fontWeight: 'bold' }}>{teacherModel.name}</Typography>
      <Typography
        sx={{
          border: '1px solid #B0AAAE',
          borderRadius: '10px',
          width: 'fit-content',
          padding: '5px',
          fontSize: '14px',
          fontWeight: 'bold',
          color: '#43E45B'
        }}
      >
        Ngày sinh: {moment(teacherModel.birthday).format('DD-MM-YYYY')}
      </Typography>
      <Box sx={{ display: 'flex', flexDirection: 'row' }}>
        {/* <SchoolOutline sx={{ marginRight: '3px' }}></SchoolOutline>
        <Typography sx={{ marginRight: '15px' }}>3: Class</Typography> */}
        <Typography>{teacherModel.listSubjectOfTeacher.length}Course : </Typography>
        <BookmarkCheckOutline sx={{ marginRight: '3px' }}></BookmarkCheckOutline>
      </Box>

      <Button
        sx={{ backgroundColor: '#9155fd', color: 'white', ':hover': { backgroundColor: '#008BC5', color: 'white' } }}
        onClick={() => onClickViewDetail(teacherModel)}
      >
        View details
      </Button>

      {/* Dialog */}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle
          sx={{
            textAlign: 'center',
            fontWeight: 'bold',
            fontSize: '50px'
          }}
        >
          Teacher Information
        </DialogTitle>
        <DialogContent>
          <TextField autoFocus margin='dense' id='fullname' label='Full name' fullWidth />
          <FormControl fullWidth>
            <FormLabel id='demo-row-radio-buttons-group-label'>Gender</FormLabel>
            <RadioGroup row aria-labelledby='demo-row-radio-buttons-group-label' name='row-radio-buttons-group'>
              <FormControlLabel value='female' control={<Radio />} label='Female' />
              <FormControlLabel value='male' control={<Radio />} label='Male' />
              <FormControlLabel value='other' control={<Radio />} label='Other' />
            </RadioGroup>
          </FormControl>
          <TextField margin='dense' id='birthday' title='Birth Day' type='date' fullWidth />
          <TextField margin='dense' id='address' label='Address' fullWidth />
          <TextField margin='dense' id='phone' label='Phone Number' fullWidth />
          <Autocomplete
            fullWidth
            disablePortal
            multiple={true}
            id='combo-box-demo'
            options={listCourse}
            renderInput={params => <TextField {...params} label='Courses' />}
          />
        </DialogContent>
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <DialogActions>
            <Button
              sx={{
                backgroundColor: '#9155fd',
                color: 'white',
                ':hover': { backgroundColor: '#008BC5', color: 'white' }
              }}
              type='submit'
              onClick={handleClose}
            >
              Close
            </Button>
          </DialogActions>
        </Box>
      </Dialog>
    </Card>
  )
}

const listCourse = [
  { label: 'The Shawshank Redemption', year: 1994 },
  { label: 'The Godfather', year: 1972 },
  { label: 'The Godfather: Part II', year: 1974 },
  { label: 'The Dark Knight', year: 2008 },
  { label: '12 Angry Men', year: 1957 },
  { label: "Schindler's List", year: 1993 },
  { label: 'Pulp Fiction', year: 1994 },
  {
    label: 'The Lord of the Rings: The Return of the King',
    year: 2003
  },
  { label: 'The Good, the Bad and the Ugly', year: 1966 },
  { label: 'Fight Club', year: 1999 },
  {
    label: 'The Lord of the Rings: The Fellowship of the Ring',
    year: 2001
  },
  {
    label: 'Star Wars: Episode V - The Empire Strikes Back',
    year: 1980
  },
  { label: 'Forrest Gump', year: 1994 },
  { label: 'Inception', year: 2010 },
  {
    label: 'The Lord of the Rings: The Two Towers',
    year: 2002
  },
  { label: "One Flew Over the Cuckoo's Nest", year: 1975 },
  { label: 'Goodfellas', year: 1990 },
  { label: 'The Matrix', year: 1999 },
  { label: 'Seven Samurai', year: 1954 },
  {
    label: 'Star Wars: Episode IV - A New Hope',
    year: 1977
  },
  { label: 'City of God', year: 2002 },
  { label: 'Se7en', year: 1995 },
  { label: 'The Silence of the Lambs', year: 1991 },
  { label: "It's a Wonderful Life", year: 1946 },
  { label: 'Life Is Beautiful', year: 1997 },
  { label: 'The Usual Suspects', year: 1995 },
  { label: 'Léon: The Professional', year: 1994 },
  { label: 'Spirited Away', year: 2001 },
  { label: 'Saving Private Ryan', year: 1998 },
  { label: 'Once Upon a Time in the West', year: 1968 },
  { label: 'American History X', year: 1998 },
  { label: 'Interstellar', year: 2014 },
  { label: 'Casablanca', year: 1942 },
  { label: 'City Lights', year: 1931 },
  { label: 'Psycho', year: 1960 },
  { label: 'The Green Mile', year: 1999 },
  { label: 'The Intouchables', year: 2011 },
  { label: 'Modern Times', year: 1936 },
  { label: 'Raiders of the Lost Ark', year: 1981 },
  { label: 'Rear Window', year: 1954 },
  { label: 'The Pianist', year: 2002 },
  { label: 'The Departed', year: 2006 },
  { label: 'Terminator 2: Judgment Day', year: 1991 },
  { label: 'Back to the Future', year: 1985 },
  { label: 'Whiplash', year: 2014 },
  { label: 'Gladiator', year: 2000 },
  { label: 'Memento', year: 2000 },
  { label: 'The Prestige', year: 2006 },
  { label: 'The Lion King', year: 1994 },
  { label: 'Apocalypse Now', year: 1979 },
  { label: 'Alien', year: 1979 },
  { label: 'Sunset Boulevard', year: 1950 },
  {
    label: 'Dr. Strangelove or: How I Learned to Stop Worrying and Love the Bomb',
    year: 1964
  },
  { label: 'The Great Dictator', year: 1940 },
  { label: 'Cinema Paradiso', year: 1988 },
  { label: 'The Lives of Others', year: 2006 },
  { label: 'Grave of the Fireflies', year: 1988 },
  { label: 'Paths of Glory', year: 1957 },
  { label: 'Django Unchained', year: 2012 },
  { label: 'The Shining', year: 1980 },
  { label: 'WALL·E', year: 2008 },
  { label: 'American Beauty', year: 1999 },
  { label: 'The Dark Knight Rises', year: 2012 },
  { label: 'Princess Mononoke', year: 1997 },
  { label: 'Aliens', year: 1986 },
  { label: 'Oldboy', year: 2003 },
  { label: 'Once Upon a Time in America', year: 1984 },
  { label: 'Witness for the Prosecution', year: 1957 },
  { label: 'Das Boot', year: 1981 },
  { label: 'Citizen Kane', year: 1941 },
  { label: 'North by Northwest', year: 1959 },
  { label: 'Vertigo', year: 1958 },
  {
    label: 'Star Wars: Episode VI - Return of the Jedi',
    year: 1983
  },
  { label: 'Reservoir Dogs', year: 1992 },
  { label: 'Braveheart', year: 1995 },
  { label: 'M', year: 1931 },
  { label: 'Requiem for a Dream', year: 2000 },
  { label: 'Amélie', year: 2001 },
  { label: 'A Clockwork Orange', year: 1971 },
  { label: 'Like Stars on Earth', year: 2007 },
  { label: 'Taxi Driver', year: 1976 },
  { label: 'Lawrence of Arabia', year: 1962 },
  { label: 'Double Indemnity', year: 1944 },
  {
    label: 'Eternal Sunshine of the Spotless Mind',
    year: 2004
  },
  { label: 'Amadeus', year: 1984 },
  { label: 'To Kill a Mockingbird', year: 1962 },
  { label: 'Toy Story 3', year: 2010 },
  { label: 'Logan', year: 2017 },
  { label: 'Full Metal Jacket', year: 1987 },
  { label: 'Dangal', year: 2016 },
  { label: 'The Sting', year: 1973 },
  { label: '2001: A Space Odyssey', year: 1968 },
  { label: "Singin' in the Rain", year: 1952 },
  { label: 'Toy Story', year: 1995 },
  { label: 'Bicycle Thieves', year: 1948 },
  { label: 'The Kid', year: 1921 },
  { label: 'Inglourious Basterds', year: 2009 },
  { label: 'Snatch', year: 2000 },
  { label: '3 Idiots', year: 2009 },
  { label: 'Monty Python and the Holy Grail', year: 1975 }
]
