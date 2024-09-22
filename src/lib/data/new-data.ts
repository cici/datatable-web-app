export interface Song {
	song_name: string;
	encore: boolean;
	artist_name: string | null; // null if it's not a cover song
}

export interface Event {
	artist_show_id: string;
	event_date: string;
	venue_name: string;
	city_name: string;
	state: string;
	song_list: Song[];
}

export const eventsData: Event[] = [
	{
		event_id: 101,
		event_date: '2024-09-07',
		venue_name: 'Red Rocks Amphitheatre',
		city_name: 'Morrison',
		state: 'Colorado',
		songs: [
			{ song_name: 'Follow', encore: false, artist_name: null },
			{ song_name: 'The Story', encore: false, artist_name: null },
			{ song_name: 'Hallelujah', encore: false, artist_name: 'Leonard Cohen' },
			{ song_name: 'Again Today', encore: false, artist_name: null },
			{ song_name: 'Creep', encore: false, artist_name: 'Radiohead' }
		]
	},
	{
		event_id: 102,
		event_date: '2024-09-06',
		venue_name: 'Red Rocks Amphitheatre',
		city_name: 'Morrison',
		state: 'Colorado',
		songs: [
			{ song_name: 'What Can I Say', encore: false, artist_name: null },
			{ song_name: 'Throw It All Away', encore: false, artist_name: null },
			{ song_name: 'Happy', encore: false, artist_name: null },
			{ song_name: 'Fall Apart Again', encore: false, artist_name: null },
			{ song_name: "The Times They Are A-Changin'", encore: true, artist_name: 'Bob Dylan' }
		]
	},
	{
		event_id: 103,
		event_date: '2024-08-30',
		venue_name: 'Jas Aspen',
		city_name: 'Aspen',
		state: 'Colorado',
		songs: [
			{ song_name: 'Imagine', encore: false, artist_name: 'John Lennon' },
			{ song_name: 'All of Me', encore: false, artist_name: 'John Legend' },
			{ song_name: 'Let It Be', encore: true, artist_name: 'The Beatles' }
		]
	},
	{
		event_id: 104,
		event_date: '2024-08-22',
		venue_name: 'The Salt Shed',
		city_name: 'Chicago',
		state: 'Illinois',
		songs: [
			{ song_name: 'Rolling in the Deep', encore: false, artist_name: 'Adele' },
			{ song_name: 'Someone Like You', encore: false, artist_name: 'Adele' },
			{ song_name: 'Set Fire to the Rain', encore: true, artist_name: 'Adele' }
		]
	},
	{
		event_id: 105,
		event_date: '2024-08-15',
		venue_name: 'Hollywood Bowl',
		city_name: 'Los Angeles',
		state: 'California',
		songs: [
			{ song_name: 'Purple Rain', encore: false, artist_name: 'Prince' },
			{ song_name: 'Kiss', encore: true, artist_name: 'Prince' }
		]
	},
	{
		event_id: 106,
		event_date: '2024-08-10',
		venue_name: 'Red Rocks Amphitheatre',
		city_name: 'Morrison',
		state: 'Colorado',
		songs: [
			{ song_name: 'The Scientist', encore: false, artist_name: 'Coldplay' },
			{ song_name: 'Yellow', encore: false, artist_name: 'Coldplay' },
			{ song_name: 'Fix You', encore: true, artist_name: 'Coldplay' }
		]
	},
	{
		event_id: 107,
		event_date: '2024-08-05',
		venue_name: 'The Forum',
		city_name: 'Inglewood',
		state: 'California',
		songs: [
			{ song_name: 'Stairway to Heaven', encore: false, artist_name: 'Led Zeppelin' },
			{ song_name: 'Kashmir', encore: false, artist_name: 'Led Zeppelin' },
			{ song_name: 'Whole Lotta Love', encore: true, artist_name: 'Led Zeppelin' }
		]
	},
	{
		event_id: 108,
		event_date: '2024-07-28',
		venue_name: 'Alpine Valley Music Theatre',
		city_name: 'East Troy',
		state: 'Wisconsin',
		songs: [
			{ song_name: 'Hey Jude', encore: false, artist_name: 'The Beatles' },
			{ song_name: 'Let It Be', encore: true, artist_name: 'The Beatles' }
		]
	},
	{
		event_id: 109,
		event_date: '2024-07-20',
		venue_name: 'Red Rocks Amphitheatre',
		city_name: 'Morrison',
		state: 'Colorado',
		songs: [
			{ song_name: 'Billie Jean', encore: false, artist_name: 'Michael Jackson' },
			{ song_name: 'Thriller', encore: false, artist_name: 'Michael Jackson' },
			{ song_name: 'Beat It', encore: true, artist_name: 'Michael Jackson' }
		]
	},
	{
		event_id: 110,
		event_date: '2024-07-15',
		venue_name: 'Coachella Valley Music and Arts Festival',
		city_name: 'Indio',
		state: 'California',
		songs: [
			{ song_name: 'Blinding Lights', encore: false, artist_name: 'The Weeknd' },
			{ song_name: 'Save Your Tears', encore: false, artist_name: 'The Weeknd' },
			{ song_name: "Can't Feel My Face", encore: true, artist_name: 'The Weeknd' }
		]
	}
];
