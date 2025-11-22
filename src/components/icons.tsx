import type { SVGProps } from 'react';

export function AwsIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M11.2,16.16a.4.4,0,0,1-.38-.22L9.15,11.5a.41.41,0,0,1,.76-.44l1.67,4.44a.4.4,0,0,1-.38.56Z" />
      <path d="M16.33,18.42a.41.41,0,0,1-.41-.41V9.58a.41.41,0,0,1,.82,0v8.43a.41.41,0,0,1-.41.41Z" />
      <path d="M21.28,21.5H2.72a.72.72,0,0,1-.72-.72V3.22a.72.72,0,0,1,.72-.72H21.28a.72.72,0,0,1,.72.72V20.78a.72.72,0,0,1-.72.72ZM3.44,20.07H20.56V3.93H3.44Z" />
      <path d="M7.74,15.6a.4.4,0,0,1-.28-.68L9.9,12.48l-2-2.73a.4.4,0,0,1,.64-.5l2.25,3,2.25-3a.4.4,0,0,1,.64.5l-2,2.73,2.44,2.44a.4.4,0,0,1-.56.56L13,15.09,10.65,17.5a.4.4,0,0,1-.28,0L7.74,15.6Z" />
    </svg>
  );
}

export function DevOpsIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M12 2.69l5.31 5.31-1.41 1.41-3.9-3.9-3.9 3.9-1.41-1.41L12 2.69zM2.69 12l5.31 5.31 1.41-1.41-3.9-3.9 3.9-3.9-1.41-1.41L2.69 12zm18.62 0l-5.31-5.31-1.41 1.41 3.9 3.9-3.9 3.9 1.41 1.41L21.31 12zM12 21.31l-5.31-5.31 1.41-1.41 3.9 3.9 3.9-3.9 1.41 1.41L12 21.31z"/>
      <circle cx="12" cy="12" r="2"/>
    </svg>
  );
}


export function UsaFlagIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 7410 3900" {...props}>
        <path fill="#b22234" d="M0 0h7410v3900H0z"/>
        <path stroke="#fff" strokeWidth="300" d="M0 450h7410m0 600H0m0 600h7410m0 600H0m0 600h7410m0 600H0"/>
        <path fill="#3c3b6e" d="M0 0h2964v2100H0z"/>
        <g fill="#fff">
            <g id="d">
                <g id="c">
                    <g id="b">
                        <path id="a" d="M247 90l70 215-182-133h224L135 305z"/>
                        <use href="#a" x="494"/>
                    </g>
                    <use href="#b" x="988"/>
                </g>
                <use href="#c" x="1976"/>
            </g>
            <use href="#d" y="420"/>
            <use href="#d" y="840"/>
            <use href="#d" y="1260"/>
        </g>
    </svg>
  );
}

export function SpainFlagIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 750 500" {...props}>
      <path fill="#c60b1e" d="M0 0h750v500H0z"/>
      <path fill="#ffc400" d="M0 125h750v250H0z"/>
    </svg>
  );
}
