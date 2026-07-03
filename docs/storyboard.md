# Storyboard — Forvilla Artisan Reel (30s, 1080x1920, 30fps)

One template, six reels. Every beat below is driven by vendor data
(`template/configs.json`), so swapping the config swaps the story without touching
a single keyframe.

Narrative arc: **brand hello → a booth builds itself from nothing → the goods →
the person who made them → where to find them → download the app.**

## Beat sheet

| Time | Beat | What happens on screen |
|---|---|---|
| 0.0 – 2.7 | Brand open | Forvilla mark scales in with overshoot; "forvilla / for the village" wordmark rises; card fades up and away into the scene |
| 2.5 – 3.8 | The empty lot | Plaza ground pops in (scale-bounce), sun rises, clouds drift in, trees spring up left then right |
| 3.5 – 4.2 | Build: frame | Booth posts drop from above with an overshoot landing (the Sims moment) |
| 4.2 – 4.9 | Build: counter | Market counter slides up from the ground and settles |
| 4.9 – 5.6 | Build: canopy | Striped canopy drops on with a squash-and-stretch bounce (vendor's brand colors) |
| 5.7 – 6.9 | Build: sign | Vendor name sign swings down from the canopy on ropes, pendulum-settles |
| 6.5 – 7.2 | Build: dressing | Bunting draws itself across the counter front |
| 7.1 – 8.0 | Build complete | Sparkle burst over the finished booth |
| 8.0 – 9.0 | Camera | Push in toward the counter |
| 9.0 – 14.4 | The goods | Three products pop onto the counter one at a time (9.0 / 10.9 / 12.8), each with a labeled chip; labels clear out at 14.3 |
| 14.4 – 15.3 | Camera | Pull back to the full booth |
| 15.0 – 20.4 | Meet the maker | Artisan avatar medallion slides in; speech card types out the two story lines and the vendor's Instagram handle; hearts float up |
| 20.6 – 25.2 | Where to find them | Info card rises from the bottom (event name, date, venue); map pin drops and bounces over the booth; booth-number chip |
| 25.2 – 26.3 | The app | Whole village shrinks into a phone screen that slides up around it |
| 26.4 – 30.0 | CTA / end card | "Follow {vendor} on" + Forvilla logo pulse + wordmark + @forvilla_project; hold to 30s |

## Timing rules used throughout

- Every entrance uses overshoot (`easeOutBack`) or elastic settle — nothing just
  fades in during the build; things land, bounce, and settle like set pieces.
- One new element at a time; minimum 0.4s between landings so each read is clean.
- Camera moves are slow ease-in-out and never overlap a landing.
- All copy is on screen at least 2.5s; the event card holds 4.5s.

## The "5 seconds already done" note

The brief says the first ~5 seconds exist already. In this prototype the 0:00–2.7
brand open plus the ground/trees beat stands in for it. The build is structured so
that segment can be replaced 1:1 with the client's approved opening and the booth
build picks up from whatever frame they hand off.
