import {createTheme} from 'react-data-table-component';
import { defaultThemes } from 'react-data-table-component';

export const theme = createTheme('individuality', {
    text: {
      primary: '#ffff',
      secondary: '#ffff',
    },
    background: {
      default: '#ABB2B9',
    },
    context: {
      background: '#268bd2',
      text: '#FFFFFF',
    },
    divider: {
      default: defaultThemes.default.divider.default,
    },
    action: {
      button: 'rgba(0,0,0,.54)',
      hover: 'rgba(0,0,0,.08)',
      disabled: 'rgba(0,0,0,.12)',
    },
  }, 'dark');

export const individualityTheme = createTheme('solarized', {
    text: {
      primary: '#17202b',
      secondary: '#17202c',
    },
    background: {
      default: '#f8c471',
    },
    context: {
      background: '#268bd2',
      text: '#FFFFFF',
    },
    divider: {
      default: defaultThemes.default.divider.default,
    },
    action: {
      button: 'rgba(0,0,0,.54)',
      hover: 'rgba(0,0,0,.08)',
      disabled: 'rgba(0,0,0,.12)',
    },
  }, 'individuality');

  export const customStyles = {
	header: {
		style: {
		  minHeight: '60px',
		  background: 'gray',			
		  color: '#ffff',
		  fontWeight: 'bold',
		  fontSize: '30px',
		  justifyContent: 'center',
		  textAlign: 'center'
		},
	},
	headRow: {
		style: {
			borderTopStyle: 'solid',
			background: 'gray',
		    color: '#fff',
			borderTopWidth: '1px',
			borderTopColor: defaultThemes.default.divider.default,
		},
	},
	headCells: {
		style: {	
			'&:not(:last-of-type)': {
				borderRightStyle: 'solid',
				borderRightWidth: '1px',
				borderRightColor: defaultThemes.default.divider.default,
			},
		},
	},
	cells: {
		style: {
			'&:not(:last-of-type)': {
				borderRightStyle: 'solid',
				borderRightWidth: '1px',
				minHeight: '80px',
				borderRightColor: defaultThemes.default.divider.default,
			},
		},
	},
  rows: {
	  highlightOnHoverStyle: {
		  backgroundColor: '#268b',
		  borderRadius: '0px',
		  
	  },
  },
  pagination: {
	  style: {
		  border: 'none',
	  }
  }
};

export const compactGrid = {
  	header: {
  		style: {
        minHeight: '60px',
        background: 'gray',			
        color: '#ffff',
        fontWeight: 'bold',
        fontSize: '30px',
        justifyContent: 'center',
		textAlign: 'center'
  		},
  	},
  	headRow: {
  		style: {
        borderTopStyle: 'solid',
        background: 'gray',
          color: '#fff',
        borderTopWidth: '1px',
        borderTopColor: defaultThemes.default.divider.default,
      },
  	},
  	headCells: {
  		style: {
  			'&:not(:last-of-type)': {
  				borderRightStyle: 'solid',
  				borderRightWidth: '1px',
  				borderRightColor: defaultThemes.default.divider.default,
  			},
  		},
  	},
  	cells: {
  		style: {
  			'&:not(:last-of-type)': {
  				borderRightStyle: 'solid',
  				borderRightWidth: '1px',
  				borderRightColor: defaultThemes.default.divider.default,
  			},
  		},
  	},
  };
