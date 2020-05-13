import React from 'react'

export function Signup() {
  return (
    <form
      action="https://buttondown.email/api/emails/embed-subscribe/SleeplessByte"
      method="post"
      target="popupwindow"
      onsubmit="window.open('https://buttondown.email/SleeplessByte', 'popupwindow')"
      class="embeddable-buttondown-form"
    >
      <p>
        If you like these articles, and <em>don't want to miss them</em>,
        receive them <strong>in your inbox</strong>. No spam, unsubscribe at any
        time.
      </p>
      <label for="bd-email">Enter your email</label>
      <input type="email" name="email" id="bd-email" />
      <input type="hidden" value="1" name="embed"></input>
      <input type="submit" value="Subscribe"></input>
    </form>
  )
}
