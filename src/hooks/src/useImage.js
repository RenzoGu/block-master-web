import { useState, useEffect } from 'react'

const myPromise = src => {
	console.info(src)
	return new Promise((ok, fail) => {
		setTimeout(src => {
			fetch(src)
				.then(result => result.blob())
				.then(blob => ok(URL.createObjectURL(blob)))
				.catch(fail)
		}, 200, src)
	})
}

const useImage = arguments => {
	
}

export { useImage }