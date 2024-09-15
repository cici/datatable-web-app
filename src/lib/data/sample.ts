export interface Song {
	title: string;
	tags: string[];
	note?: string;
}

export interface Venue {
	id: number;
	index: number;
	venueName: string;
	venueLink: string;
	projectManager: {
		name: string;
		avatar: string;
	};
	status: 'On track' | 'On hold' | 'At risk';
	showDate: string;
	numberOfSongs: number;
	songs: Song[];
}

export const data: Venue[] = [
	{
		id: 1,
		index: 1,
		venueName: 'The Royal Theater',
		venueLink: '#',
		projectManager: {
			name: 'Alice Johnson',
			avatar: 'favicon.png'
		},
		status: 'On track',
		showDate: '2023-10-15',
		numberOfSongs: 3,
		songs: [
			{
				title: 'Song of Freedom',
				tags: ['Original'],
				note: 'Opening song'
			},
			{
				title: 'Melody of Life',
				tags: ['Cover', 'Artist: John Doe'],
				note: ''
			},
			{
				title: 'Harmony in Motion',
				tags: [],
				note: 'Guest performer'
			}
		]
	},
	{
		id: 2,
		index: 2,
		venueName: 'Sunset Arena',
		venueLink: '#',
		projectManager: {
			name: 'Bob Smith',
			avatar: 'favicon.png'
		},
		status: 'On hold',
		showDate: '2023-11-05',
		numberOfSongs: 2,
		songs: [
			{
				title: 'Echoes of Time',
				tags: ['Cover'],
				note: ''
			},
			{
				title: 'Whispering Winds',
				tags: ['Original'],
				note: 'Special appearance'
			}
		]
	},
	{
		id: 3,
		index: 3,
		venueName: 'Grand Hall',
		venueLink: '#',
		projectManager: {
			name: 'Carol White',
			avatar: 'favicon.png'
		},
		status: 'At risk',
		showDate: '2023-12-20',
		numberOfSongs: 4,
		songs: [
			{
				title: 'Rhythm of the Night',
				tags: ['Cover'],
				note: ''
			},
			{
				title: 'Silent Whisper',
				tags: [],
				note: 'Solo performance'
			},
			{
				title: 'Dance with Me',
				tags: ['Original'],
				note: ''
			},
			{
				title: 'Finale Symphony',
				tags: ['Cover', 'Artist: The Classics'],
				note: ''
			}
		]
	},
	{
		id: 4,
		index: 4,
		venueName: 'Open Air Concert',
		venueLink: '#',
		projectManager: {
			name: 'David Lee',
			avatar: 'favicon.png'
		},
		status: 'On track',
		showDate: '2024-01-10',
		numberOfSongs: 5,
		songs: [
			{
				title: 'Morning Glory',
				tags: ['Original'],
				note: ''
			},
			{
				title: 'Sky High',
				tags: ['Cover'],
				note: 'Featuring guest artist'
			},
			{
				title: 'Heartbeat',
				tags: [],
				note: ''
			},
			{
				title: 'Sunset Boulevard',
				tags: ['Cover', 'Artist: Sunset Band'],
				note: ''
			},
			{
				title: 'Nightfall',
				tags: ['Original'],
				note: 'Closing song'
			}
		]
	},
	{
		id: 5,
		index: 5,
		venueName: 'City Square',
		venueLink: '#',
		projectManager: {
			name: 'Eva Green',
			avatar: 'favicon.png'
		},
		status: 'On hold',
		showDate: '2024-02-18',
		numberOfSongs: 2,
		songs: [
			{
				title: 'Urban Beats',
				tags: ['Original'],
				note: ''
			},
			{
				title: 'Echo Chamber',
				tags: ['Cover'],
				note: ''
			}
		]
	},
	{
		id: 6,
		index: 6,
		venueName: 'Harmony Hall',
		venueLink: '#',
		projectManager: {
			name: 'Frank Miller',
			avatar: 'favicon.png'
		},
		status: 'On track',
		showDate: '2024-03-12',
		numberOfSongs: 3,
		songs: [
			{
				title: 'Symphony of Dreams',
				tags: [],
				note: ''
			},
			{
				title: 'Canvas of Sound',
				tags: ['Original'],
				note: 'Debut performance'
			},
			{
				title: 'Resonance',
				tags: ['Cover'],
				note: ''
			}
		]
	},
	{
		id: 7,
		index: 7,
		venueName: 'Mountain Festival',
		venueLink: '#',
		projectManager: {
			name: 'Grace Kelly',
			avatar: 'favicon.png'
		},
		status: 'At risk',
		showDate: '2024-04-25',
		numberOfSongs: 4,
		songs: [
			{
				title: 'High Altitude',
				tags: ['Original'],
				note: ''
			},
			{
				title: 'Breathless',
				tags: ['Cover'],
				note: ''
			},
			{
				title: 'Summit',
				tags: [],
				note: ''
			},
			{
				title: 'Echoes in the Valley',
				tags: ['Cover', 'Artist: Mountain Band'],
				note: ''
			}
		]
	},
	{
		id: 8,
		index: 8,
		venueName: 'Beachside Bash',
		venueLink: '#',
		projectManager: {
			name: 'Henry Adams',
			avatar: 'favicon.png'
		},
		status: 'On track',
		showDate: '2024-05-30',
		numberOfSongs: 3,
		songs: [
			{
				title: 'Waves',
				tags: ['Original'],
				note: ''
			},
			{
				title: 'Sandy Toes',
				tags: ['Cover'],
				note: ''
			},
			{
				title: 'Ocean Breeze',
				tags: [],
				note: 'Featuring local artists'
			}
		]
	},
	{
		id: 9,
		index: 9,
		venueName: 'Desert Nights',
		venueLink: '#',
		projectManager: {
			name: 'Ivy Brown',
			avatar: 'favicon.png'
		},
		status: 'On hold',
		showDate: '2024-06-15',
		numberOfSongs: 2,
		songs: [
			{
				title: 'Dunes',
				tags: ['Original'],
				note: ''
			},
			{
				title: 'Starry Sky',
				tags: ['Cover'],
				note: ''
			}
		]
	},
	{
		id: 10,
		index: 10,
		venueName: 'City Lights',
		venueLink: '#',
		projectManager: {
			name: 'Jack Wilson',
			avatar: 'favicon.png'
		},
		status: 'At risk',
		showDate: '2024-07-22',
		numberOfSongs: 3,
		songs: [
			{
				title: 'Midnight Walk',
				tags: ['Original'],
				note: ''
			},
			{
				title: 'Neon Dreams',
				tags: ['Cover'],
				note: ''
			},
			{
				title: 'Concrete Jungle',
				tags: [],
				note: ''
			}
		]
	}
];
