import { trigger, transition, state, animate, style } from '@angular/animations';

const animations = {
   "zoomInOut": trigger('zoomInOut', [ 
        state('void',style({transform: 'scale(0.6)' })),
        transition('void => *', [
          animate(200)
        ]),
        transition('* => void', [
          animate(100)
        ])
      ]),

    "slideLeftRight": trigger('slideLeftRight', [
        state('void',style({transform: 'translate(-100%, 0)'})),
        transition('void <=> *', [
          animate('200ms ease-out')
        ])
    ]),

    "slideToLeft": trigger('slideToLeft',[
      transition('void => *', [
        style({transform: 'translateX(100%)', display: 'none'}),
        animate('300ms ease-in', style({transform: 'translateX(0%)', display: 'block'}))
      ]),
      transition('* => void',[
        style({transform: 'translateX(0%)'}),
        animate('300ms ease-out', style({transform: 'translateX(-100%)'}))
      ])
    ])
}

export const globalAnimation = {
    animationList: animations
}