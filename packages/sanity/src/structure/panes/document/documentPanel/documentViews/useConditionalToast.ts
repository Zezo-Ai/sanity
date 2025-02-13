import {type ToastParams, useToast} from '@sanity/ui'
import {useEffect} from 'react'

// https://developer.mozilla.org/en-US/docs/Web/API/setTimeout#maximum_delay_value
const LONG_ENOUGH_BUT_NOT_TOO_LONG = 1000 * 60 * 60 * 24 * 24

/**
 * Workaround to support conditional toast (e.g. a toast that is visible as long as a condition holds true)
 */
export function useConditionalToast(params: ToastParams & {id: string; enabled?: boolean}) {
  const toast = useToast()

  // note1: there's a `duration || 0` in Sanity UI's pushToast(), so make it non-falsey
  // note2: cannot use `Infinity` as duration, since it exceeds setTimeout's maximum delay value
  useEffect(() => {
    if (params.enabled) {
      toast.push({...params, duration: LONG_ENOUGH_BUT_NOT_TOO_LONG})
    }
    return () => {
      if (params.enabled) {
        toast.push({
          ...params,
          // Note: @sanity/ui fallbacks to the default duration of 4s in case of falsey values
          duration: 0.01,
        })
      }
    }
  }, [params, toast])
}
