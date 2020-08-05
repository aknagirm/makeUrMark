import { trigger, transition, state, animate, style, query, group } from '@angular/animations';

const left = [
  query(':enter, :leave', style({ position: 'fixed', width: '100%' }), { optional: true }),
  group([
    query(':enter', [style({ transform: 'translateX(-100%)' }), animate('.3s ease-out', style({ transform: 'translateX(0%)' }))], {
      optional: true,
    }),
    query(':leave', [style({ transform: 'translateX(0%)' }), animate('.3s ease-out', style({ transform: 'translateX(100%)' }))], {
      optional: true,
    }),
  ]),
];

const right = [
  query(':enter, :leave', style({ position: 'fixed', width: '100%' }), { optional: true }),
  group([
    query(':enter', [style({ transform: 'translateX(100%)' }), animate('.3s ease-out', style({ transform: 'translateX(0%)' }))], {
      optional: true,
    }),
    query(':leave', [style({ transform: 'translateX(0%)' }), animate('.3s ease-out', style({ transform: 'translateX(-100%)' }))], {
      optional: true,
    }),
  ]),
];

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

    "slideLeftRightNew": trigger('slideLeftRightNew', [
        transition(':increment', right),
        transition(':decrement', left),
          ])
      ,

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