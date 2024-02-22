// ** MUI Imports
import Box from '@mui/material/Box'
import Link from '@mui/material/Link'
import Typography from '@mui/material/Typography'

const FooterContent = () => {
  // ** Var
  //const hidden = useMediaQuery((theme: Theme) => theme.breakpoints.down('md'))

  return (
    <Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'flex-end' }}>
      <Typography sx={{ mr: 2, textAlign: 'right' }}>
        {` Made with `}
        <Box component='span' sx={{ color: 'error.main' }}>
          ❤️
        </Box>
        {` by `}
        <Link target='_blank' href='https://github.com/TeamProject-PRN321'>
          VAND-Teams
        </Link>
        {`, © ${new Date().getFullYear()}`}
      </Typography>
    </Box>
  )
}

export default FooterContent
