import { Injectable, signal, computed } from '@angular/core';

export type Language = 'en' | 'de';

export interface Translations {
  navbar: {
    aboutMe: string;
    skills: string;
    portfolio: string;
    contact: string;
  };
  hero: {
    iAm: string;
    title: string;
    letsTalk: string;
    scrollDown: string;
  };
  about: {
    title: string;
    greeting: string;
    description: string;
    ctaText: string;
    feature1: string;
    feature2: string;
    feature3: string;
  };
  skills: {
    title: string;
    description: string;
    anotherSkill: string;
    anotherSkillText: string;
    getInTouch: string;
    continuallyLearning: string;
  };
  portfolio: {
    title: string;
    subtitle: string;
    github: string;
    liveTest: string;
    pokedexTitle: string;
    pokedexDesc: string;
    polloTitle: string;
    polloDesc: string;
    dabubbleTitle: string;
    dabubbleDesc: string;
  };
  contact: {
    title: string;
    infoTitle: string;
    infoText: string;
    needDeveloper: string;
    contactMe: string;
    yourName: string;
    yourEmail: string;
    yourMessage: string;
    privacyText: string;
    privacyPolicy: string;
    sendMessage: string;
  };
  footer: {
    legalNotice: string;
    imprint: string;
  };
}

const translations: Record<Language, Translations> = {
  en: {
    navbar: {
      aboutMe: 'About me',
      skills: 'Skills',
      portfolio: 'Portfolio',
      contact: 'Contact',
    },
    hero: {
      iAm: 'I am',
      title: 'FRONTEND DEVELOPER',
      letsTalk: "Let's talk!",
      scrollDown: 'Scroll down',
    },
    about: {
      title: 'About me',
      greeting: "Hi, I'm Vadim!",
      description: "As a frontend developer, I enjoy transforming ideas into interactive and visually appealing web applications. My passion for clean code and user-friendly interfaces drives me to constantly explore new technologies and best practices.",
      ctaText: "Let's connect and create something amazing together!",
      feature1: 'Based in Germany, I am flexible with remote work and open to relocation opportunities for the right project.',
      feature2: 'I am passionate about learning new technologies and continuously improving my skills to stay ahead in the ever-evolving tech landscape.',
      feature3: 'I approach each challenge with analytical thinking and creativity, always striving to find efficient and elegant solutions through collaboration.',
    },
    skills: {
      title: 'Skills',
      description: 'I have gained experience working on various projects using technologies like HTML, CSS, JavaScript, TypeScript, and Angular. I am always eager to learn new tools and adapt to emerging technologies.\n\nContinuous learning is key in web development, and I stay up-to-date with the latest trends and best practices.',
      anotherSkill: 'another skill',
      anotherSkillText: 'Feel free to contact me. I am open to learning new technologies and frameworks to meet your project needs.',
      getInTouch: 'Get in touch',
      continuallyLearning: 'Continually learning',
    },
    portfolio: {
      title: 'Portfolio',
      subtitle: 'Explore a selection of my work here – interact with projects to see my skills in action.',
      github: 'Github',
      liveTest: 'Live test',
      pokedexTitle: 'Pokedex',
      pokedexDesc: 'A Pokemon encyclopedia that fetches data from the PokeAPI. Browse, search and explore detailed information about different Pokemon.',
      polloTitle: 'El Pollo Loco',
      polloDesc: 'Jump, run and throw game based on object-oriented approach. Help Pepe to find coins and tabasco salsa to fight against the crazy hen.',
      dabubbleTitle: 'DABubble',
      dabubbleDesc: 'This App is a Slack Clone App. It revolutionizes team communication and collaboration with its intuitive interface, real-time messaging, and all the features.',
    },
    contact: {
      title: 'Contact',
      infoTitle: 'Got a problem to solve?',
      infoText: 'Encourage people to contact you and describe what role you see yourself in. Show that you will add value to their projects through your work.',
      needDeveloper: 'Need a Frontend developer?',
      contactMe: 'Contact me!',
      yourName: 'Your name',
      yourEmail: 'Your email',
      yourMessage: 'Your message',
      privacyText: "I've read the",
      privacyPolicy: 'privacy policy',
      sendMessage: 'Send message :)',
    },
    footer: {
      legalNotice: 'Legal Notice',
      imprint: 'Imprint',
    },
  },
  de: {
    navbar: {
      aboutMe: 'Über mich',
      skills: 'Fähigkeiten',
      portfolio: 'Portfolio',
      contact: 'Kontakt',
    },
    hero: {
      iAm: 'Ich bin',
      title: 'FRONTEND ENTWICKLER',
      letsTalk: 'Lass uns reden!',
      scrollDown: 'Nach unten scrollen',
    },
    about: {
      title: 'Über mich',
      greeting: 'Hi, ich bin Vadim!',
      description: 'Als Frontend-Entwickler macht es mir Freude, Ideen in interaktive und visuell ansprechende Webanwendungen zu verwandeln. Meine Leidenschaft für sauberen Code und benutzerfreundliche Oberflächen treibt mich an, ständig neue Technologien und Best Practices zu erkunden.',
      ctaText: 'Lass uns verbinden und gemeinsam etwas Erstaunliches schaffen!',
      feature1: 'Ich lebe in Deutschland und bin flexibel für Remote-Arbeit sowie offen für Umzugsmöglichkeiten bei passenden Projekten.',
      feature2: 'Ich bin begeistert davon, neue Technologien zu lernen und meine Fähigkeiten kontinuierlich zu verbessern, um in der sich ständig weiterentwickelnden Tech-Landschaft vorne zu bleiben.',
      feature3: 'Ich gehe jede Herausforderung mit analytischem Denken und Kreativität an und strebe stets nach effizienten und eleganten Lösungen durch Zusammenarbeit.',
    },
    skills: {
      title: 'Skills',
      description: 'Ich habe Erfahrung in verschiedenen Projekten mit Technologien wie HTML, CSS, JavaScript, TypeScript und Angular gesammelt. Ich bin immer bereit, neue Tools zu erlernen und mich an neue Technologien anzupassen.\n\nKontinuierliches Lernen ist in der Webentwicklung entscheidend, und ich bleibe stets über die neuesten Trends und Best Practices informiert.',
      anotherSkill: 'weitere Fähigkeit',
      anotherSkillText: 'Kontaktieren Sie mich gerne. Ich bin offen für das Erlernen neuer Technologien und Frameworks, um Ihre Projektanforderungen zu erfüllen.',
      getInTouch: 'Kontakt aufnehmen',
      continuallyLearning: 'Ständig lernend',
    },
    portfolio: {
      title: 'Portfolio',
      subtitle: 'Entdecken Sie hier eine Auswahl meiner Arbeiten – interagieren Sie mit Projekten, um meine Fähigkeiten in Aktion zu sehen.',
      github: 'Github',
      liveTest: 'Live-Test',
      pokedexTitle: 'Pokedex',
      pokedexDesc: 'Eine Pokemon-Enzyklopädie, die Daten von der PokeAPI abruft. Durchsuchen, suchen und erkunden Sie detaillierte Informationen über verschiedene Pokemon.',
      polloTitle: 'El Pollo Loco',
      polloDesc: 'Spring-, Lauf- und Wurfspiel basierend auf objektorientiertem Ansatz. Hilf Pepe, Münzen und Tabasco-Salsa zu finden, um gegen die verrückte Henne zu kämpfen.',
      dabubbleTitle: 'DABubble',
      dabubbleDesc: 'Diese App ist ein Slack Clone. Sie revolutioniert die Teamkommunikation und Zusammenarbeit mit ihrer intuitiven Benutzeroberfläche, Echtzeit-Messaging und allen Funktionen.',
    },
    contact: {
      title: 'Kontakt',
      infoTitle: 'Haben Sie ein Problem zu lösen?',
      infoText: 'Ermutigen Sie Menschen, Sie zu kontaktieren und beschreiben Sie, welche Rolle Sie für sich sehen. Zeigen Sie, dass Sie durch Ihre Arbeit einen Mehrwert für ihre Projekte schaffen werden.',
      needDeveloper: 'Brauchen Sie einen Frontend-Entwickler?',
      contactMe: 'Kontaktieren Sie mich!',
      yourName: 'Ihr Name',
      yourEmail: 'Ihre E-Mail',
      yourMessage: 'Ihre Nachricht',
      privacyText: 'Ich habe die',
      privacyPolicy: 'Datenschutzerklärung',
      sendMessage: 'Nachricht senden :)',
    },
    footer: {
      legalNotice: 'Impressum',
      imprint: 'Impressum',
    },
  },
};

@Injectable({
  providedIn: 'root',
})
export class TranslationService {
  private currentLanguage = signal<Language>('en');

  readonly language = this.currentLanguage.asReadonly();

  readonly t = computed(() => translations[this.currentLanguage()]);

  setLanguage(lang: Language): void {
    this.currentLanguage.set(lang);
    localStorage.setItem('language', lang);
  }

  constructor() {
    const savedLang = localStorage.getItem('language') as Language | null;
    if (savedLang && (savedLang === 'en' || savedLang === 'de')) {
      this.currentLanguage.set(savedLang);
    }
  }
}
