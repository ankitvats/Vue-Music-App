/* eslint-disable prettier/prettier */
import { Howl } from 'howler'
import helper from '@/includes/helper';

export default {
	// global-data
	state: {

		currentSong: {},
		sound: {},
		seek: '00:00',
		duration: '00:00',
		playerProgress: '0%'
	},
	// global-handlers to modify state
	mutations: {

		newSong(state, payload) {
			state.currentSong = payload;
			state.sound = new Howl({
				src: [payload.url],
				html5: true
			})
		},
		updatePosition(state) {
			state.seek = helper.formatTime(state.sound.seek())
			state.duration = helper.formatTime(state.sound.duration())
			state.playerProgress = `${(state.sound.seek() / state.sound.duration()) * 100}%`
		}
	},
	// global-selectors to get state values
	getters: {
		// authModalShow: (state) => state.authModalShow,
		playing: (state) => {
			if (state.sound.playing) {
				return state.sound.playing()
			}

			return false
		}
	},
	//   can be asynchronous
	actions: {

		async newSong({ commit, state, dispatch }, payload) {
			// if a song is already playing, stop that
			if (state.sound instanceof Howl) {
				state.sound.unload()
			}

			commit("newSong", payload);

			state.sound.play()

			state.sound.on('play', () => {
				requestAnimationFrame(() => {
					dispatch('progress')
				})
			})
		},
		async toggleAudio({ state }) {
			if (!state.sound.playing) {
				return;
			}

			if (state.sound.playing()) {
				state.sound.pause()
			} else {
				state.sound.play()
			}
		},
		progress({ commit, state, dispatch }) {
			commit('updatePosition')

			// calling the function recursively
			if (state.sound.playing()) {
				requestAnimationFrame(() => {
					dispatch('progress')
				})
			}
		},
		updateSeek({ state, dispatch }, payload) {
			// return if song is not playing
			if (!state.sound.playing) return

			// currentTarget - the main element (scrub here)
			// getBoundingClientRect - returns left, top, right, bottom, x, y, width, height of the element
			const { x, width } = payload.currentTarget.getBoundingClientRect();
			// clientX returns the horizontal coordinate
			// so we need to subtract the position of progress bar(x) from windows
			const clickX = payload.clientX - x;
			const percentage = clickX / width;
			const seconds = state.sound.duration() * percentage;

			// update the seek value with the new value
			state.sound.seek(seconds);

			// dispatch the progress action once when seek value is changed
			state.sound.once('seek', () => {
				dispatch('progress')
			})
		}
	},
}