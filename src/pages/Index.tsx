import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import Icon from '@/components/ui/icon';

export default function Index() {
  const [leads, setLeads] = useState(100);
  const [conversion, setConversion] = useState(15);
  const [avgCheck, setAvgCheck] = useState(50000);
  const [repeatPurchases, setRepeatPurchases] = useState(20);
  const [repeatCheck, setRepeatCheck] = useState(35000);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [formData, setFormData] = useState({ name: '', contact: '', segment: '', task: '' });
  const [formStatus, setFormStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [privacyAccepted, setPrivacyAccepted] = useState(false);
  const [dataProcessingAccepted, setDataProcessingAccepted] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.1 }
    );

    document.querySelectorAll('.animate-on-scroll').forEach((el) => {
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const calculatePotential = () => {
    const currentSales = (leads * conversion / 100) * avgCheck;
    const repeatRevenue = repeatPurchases * repeatCheck;
    const totalRevenue = currentSales + repeatRevenue;
    const improvedConversion = conversion + 3;
    const improvedSales = (leads * improvedConversion / 100) * avgCheck;
    const improvedTotal = improvedSales + repeatRevenue;
    const effect = improvedTotal - totalRevenue;

    return {
      currentRevenue: Math.round(totalRevenue),
      currentSalesCount: Math.round(leads * conversion / 100),
      improvedRevenue: Math.round(improvedTotal),
      effect: Math.round(effect)
    };
  };

  const results = calculatePotential();

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: 'smooth' });
    setMobileMenuOpen(false);
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus('sending');

    try {
      const response = await fetch('https://functions.poehali.dev/0e3d408b-16cc-41a7-a070-fdf0317c354a', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        setFormStatus('success');
        setFormData({ name: '', contact: '', segment: '', task: '' });
      } else {
        setFormStatus('error');
      }
    } catch (error) {
      setFormStatus('error');
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-primary">Агроконсалтинг</h1>
          <nav className="hidden lg:flex items-center gap-6">
            {['about', 'audience', 'services', 'packages', 'case', 'calculator', 'faq', 'contact'].map((section) => (
              <button
                key={section}
                onClick={() => scrollToSection(section)}
                className="text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                {section === 'about' && 'О себе'}
                {section === 'audience' && 'Кому помогаю'}
                {section === 'services' && 'Услуги'}
                {section === 'packages' && 'Пакеты'}
                {section === 'case' && 'Кейс'}
                {section === 'calculator' && 'Калькулятор'}
                {section === 'faq' && 'FAQ'}
                {section === 'contact' && 'Заявка'}
              </button>
            ))}
          </nav>
          <button
            className="lg:hidden text-primary"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <Icon name={mobileMenuOpen ? 'X' : 'Menu'} size={24} />
          </button>
        </div>
        {mobileMenuOpen && (
          <div className="lg:hidden bg-background border-t border-border animate-fade-in">
            <nav className="container mx-auto px-4 py-4 flex flex-col gap-4">
              {['about', 'audience', 'services', 'packages', 'case', 'calculator', 'faq', 'contact'].map((section) => (
                <button
                  key={section}
                  onClick={() => scrollToSection(section)}
                  className="text-left text-muted-foreground hover:text-primary transition-colors"
                >
                  {section === 'about' && 'О себе'}
                  {section === 'audience' && 'Кому помогаю'}
                  {section === 'services' && 'Услуги'}
                  {section === 'packages' && 'Пакеты'}
                  {section === 'case' && 'Кейс'}
                  {section === 'calculator' && 'Калькулятор'}
                  {section === 'faq' && 'FAQ'}
                  {section === 'contact' && 'Заявка'}
                </button>
              ))}
            </nav>
          </div>
        )}
      </header>

      <section className="pt-32 pb-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="animate-fade-in">
              <h1 className="text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                Маркетинговое сопровождение агробизнеса
              </h1>
              <p className="text-xl text-muted-foreground mb-4">
                Системный рост для дилерских центров, агрохолдингов, КФХ и инвесторов
              </p>
              <p className="text-lg text-primary mb-8 font-semibold">
                Я не веду рекламу руками. Выстраиваю систему: стратегия → воронка → KPI → внедрение.
              </p>
              <div className="flex flex-wrap gap-4">
                <Button size="lg" onClick={() => scrollToSection('contact')}>
                  Получить план роста
                </Button>
                <Button size="lg" variant="outline" onClick={() => scrollToSection('case')}>
                  Посмотреть кейс
                </Button>
              </div>
            </div>
            <div className="animate-fade-in">
              <img
                src="https://sun9-57.userapi.com/impg/BUcEJ0zJTNqDl-9S56kQZBgpU76VCGSKEqb_NQ/yW9SWFvvx4I.jpg?size=1280x1280&quality=95&sign=c11f4da16d3aa84e20ac4dc39f87c798&type=album"
                alt="Эксперт по агромаркетингу"
                className="rounded-lg shadow-2xl w-full"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 bg-card/50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            {[
              { value: '5+', label: 'лет в маркетинге' },
              { value: '1 год', label: 'директор по маркетингу' },
              { value: 'Дилеры', label: 'запчастей/сервиса' },
              { value: 'Система', label: 'воронка + KPI + внедрение' }
            ].map((item, idx) => (
              <div key={idx} className="text-center">
                <div className="text-3xl font-bold text-primary mb-2">{item.value}</div>
                <div className="text-sm text-muted-foreground">{item.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="about" className="py-20 px-4 animate-on-scroll">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-4xl font-bold mb-8 text-center">О себе</h2>
          <p className="text-lg text-muted-foreground mb-8 text-center max-w-2xl mx-auto">
            Практик на стыке маркетинга и бизнес-процессов. Не креативщик — системщик.
          </p>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              '5+ лет опыта в маркетинге',
              '1 год директором по маркетингу в агробизнесе',
              'Успешный кейс дилера запчастей',
              'Стратегия и воронка продаж',
              'KPI и CRM-логика',
              'Управление подрядчиками'
            ].map((item, idx) => (
              <div key={idx} className="flex items-start gap-3">
                <Icon name="CheckCircle2" className="text-primary flex-shrink-0 mt-1" size={20} />
                <span className="text-muted-foreground">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="audience" className="py-20 px-4 bg-card/30 animate-on-scroll">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-4xl font-bold mb-12 text-center">Кому помогаю</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: 'Truck',
                title: 'Дилерские центры',
                description: 'Техника, запчасти, сервис — оптимизация продаж, воронка обработки, повторные продажи'
              },
              {
                icon: 'Building2',
                title: 'Агрохолдинги',
                description: 'Системная маркетинговая стратегия, KPI и процессы, интеграция отделов'
              },
              {
                icon: 'Sprout',
                title: 'КФХ',
                description: 'Поиск каналов сбыта, позиционирование, выстраивание базы клиентов'
              },
              {
                icon: 'TrendingUp',
                title: 'Инвесторы',
                description: 'Аудит коммерческой модели, дорожная карта роста, оценка маркетинговой эффективности'
              }
            ].map((item, idx) => (
              <Card key={idx} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <Icon name={item.icon as any} className="text-primary mb-4" size={32} />
                  <CardTitle className="text-xl">{item.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>{item.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="services" className="py-20 px-4 animate-on-scroll">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-4xl font-bold mb-12 text-center">Услуги</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="bg-primary/10 border-primary">
              <CardHeader>
                <CardTitle className="text-lg text-primary">Консультация 60 минут</CardTitle>
                <div className="text-3xl font-bold text-primary">15 000 ₽</div>
              </CardHeader>
              <CardContent>
                <CardDescription>Результат: план действий на 14 дней с конкретными шагами</CardDescription>
              </CardContent>
            </Card>
            {[
              {
                title: 'Консалтинг для дилеров',
                description: 'Полная диагностика продаж и маркетинга с планом действий'
              },
              {
                title: 'Стратегия развития',
                description: 'Позиционирование, каналы, воронка продаж, дорожная карта'
              },
              {
                title: 'Оптимизация продаж запчастей',
                description: 'Оборачиваемость склада, повторные продажи, работа с базой'
              },
              {
                title: 'Маркетинговое сопровождение',
                description: 'Постановка задач подрядчикам, контроль качества, отчетность'
              },
              {
                title: 'Бизнес-процессы',
                description: 'Регламенты, KPI, взаимодействие отделов продаж/маркетинга/сервиса'
              }
            ].map((item, idx) => (
              <Card key={idx}>
                <CardHeader>
                  <CardTitle className="text-lg">{item.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>{item.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="packages" className="py-20 px-4 bg-card/30 animate-on-scroll">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-4xl font-bold mb-12 text-center">Пакеты сопровождения</h2>
          <div className="grid lg:grid-cols-3 gap-8 mb-8">
            {[
              {
                name: 'Бронза',
                price: '30 000 ₽/мес',
                features: [
                  'Аудит + план действий (1-й месяц)',
                  '1 созвон в неделю',
                  'План задач + контроль выполнения',
                  'Базовые KPI и отчетность',
                  'Разбор воронки и обработки лидов'
                ]
              },
              {
                name: 'Серебро',
                price: '70 000 ₽/мес',
                featured: true,
                features: [
                  'Всё из пакета Бронза',
                  '2 созвона в неделю',
                  'Постановка задач подрядчикам + контроль качества',
                  'Стандарты обработки лидов',
                  'Работа с базой (реактивация, повторные продажи)',
                  'Ежемесячный отчет план-факт'
                ]
              },
              {
                name: 'Золото',
                price: '180 000 ₽/мес',
                features: [
                  'Всё из пакета Серебро',
                  'Еженедельный управленческий контур KPI/решения',
                  'Архитектура ролей и процессов (маркетинг↔продажи↔сервис)',
                  'Квартальная дорожная карта роста',
                  'Аудит коммерческой модели',
                  '1 обучающая сессия в месяц для команды'
                ]
              }
            ].map((pkg, idx) => (
              <Card key={idx} className={pkg.featured ? 'border-primary border-2 shadow-xl' : ''}>
                <CardHeader>
                  {pkg.featured && (
                    <Badge className="w-fit mb-2">Популярный</Badge>
                  )}
                  <CardTitle className="text-2xl">{pkg.name}</CardTitle>
                  <div className="text-3xl font-bold text-primary">{pkg.price}</div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {pkg.features.map((feature, fidx) => (
                      <li key={fidx} className="flex items-start gap-2">
                        <Icon name="Check" className="text-primary flex-shrink-0 mt-1" size={16} />
                        <span className="text-sm text-muted-foreground">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button className="w-full mt-6" variant={pkg.featured ? 'default' : 'outline'} onClick={() => scrollToSection('contact')}>
                    Выбрать пакет
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
          <p className="text-center text-muted-foreground max-w-2xl mx-auto">
            Я не веду рекламу руками и не делаю креативы. Моя задача — управление подрядчиками, постановка ТЗ, контроль качества и внедрение систем.
          </p>
        </div>
      </section>

      <section id="case" className="py-20 px-4 animate-on-scroll">
        <div className="container mx-auto max-w-5xl">
          <h2 className="text-4xl font-bold mb-4 text-center">Кейс</h2>
          <h3 className="text-2xl text-center text-muted-foreground mb-12">
            Дилер сельхоззапчастей: рост эффективности продаж и повторных покупок
          </h3>
          
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <Card>
              <CardHeader>
                <CardTitle>Ситуация</CardTitle>
              </CardHeader>
              <CardContent className="text-muted-foreground">
                <p>Дилер запчастей для сельхозтехники с хаотичной обработкой заявок, низкой конверсией и практически отсутствующими повторными продажами.</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Что было сделано</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-muted-foreground">
                  <li>• Выстроена воронка обработки лидов с KPI</li>
                  <li>• Внедрены стандарты работы с базой клиентов</li>
                  <li>• Настроена CRM-логика и отчетность</li>
                  <li>• Запущена система реактивации</li>
                  <li>• Оптимизирована оборачиваемость склада</li>
                </ul>
              </CardContent>
            </Card>
          </div>

          <Card className="mb-12">
            <CardHeader>
              <CardTitle>Результаты</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-4 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary mb-2">+28%</div>
                  <div className="text-sm text-muted-foreground">рост продаж</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary mb-2">+45%</div>
                  <div className="text-sm text-muted-foreground">повторные покупки</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary mb-2">-32%</div>
                  <div className="text-sm text-muted-foreground">стоимость лида</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary mb-2">18%→24%</div>
                  <div className="text-sm text-muted-foreground">конверсия в продажу</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-muted/50">
            <CardHeader>
              <div className="flex items-center gap-4">
                <Icon name="Quote" className="text-primary" size={32} />
                <div>
                  <CardTitle>Отзыв клиента</CardTitle>
                  <CardDescription>Директор дилерского центра</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground italic">
                "Впервые увидел систему в продажах. Раньше всё было на авось — кто-то перезвонит, кто-то нет. 
                Теперь понимаю, откуда приходят клиенты, сколько стоит лид, почему одни покупают повторно, а другие нет. 
                Самое ценное — не креативы, а прозрачность процессов и результат в цифрах."
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      <section id="calculator" className="py-20 px-4 bg-card/30 animate-on-scroll">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-4xl font-bold mb-4 text-center">Калькулятор потенциала</h2>
          <p className="text-center text-muted-foreground mb-12">
            Посчитайте возможный рост выручки при оптимизации воронки продаж
          </p>

          <Card>
            <CardContent className="pt-6">
              <div className="grid md:grid-cols-2 gap-6 mb-8">
                <div>
                  <Label htmlFor="leads">Лидов в месяц</Label>
                  <Input
                    id="leads"
                    type="number"
                    value={leads}
                    onChange={(e) => setLeads(Number(e.target.value))}
                    className="mt-2"
                  />
                </div>
                <div>
                  <Label htmlFor="conversion">Конверсия в продажу (%)</Label>
                  <Input
                    id="conversion"
                    type="number"
                    value={conversion}
                    onChange={(e) => setConversion(Number(e.target.value))}
                    className="mt-2"
                  />
                </div>
                <div>
                  <Label htmlFor="avgCheck">Средний чек (₽)</Label>
                  <Input
                    id="avgCheck"
                    type="number"
                    value={avgCheck}
                    onChange={(e) => setAvgCheck(Number(e.target.value))}
                    className="mt-2"
                  />
                </div>
                <div>
                  <Label htmlFor="repeatPurchases">Повторных покупок/мес</Label>
                  <Input
                    id="repeatPurchases"
                    type="number"
                    value={repeatPurchases}
                    onChange={(e) => setRepeatPurchases(Number(e.target.value))}
                    className="mt-2"
                  />
                </div>
                <div className="md:col-span-2">
                  <Label htmlFor="repeatCheck">Средний чек повторной покупки (₽)</Label>
                  <Input
                    id="repeatCheck"
                    type="number"
                    value={repeatCheck}
                    onChange={(e) => setRepeatCheck(Number(e.target.value))}
                    className="mt-2"
                  />
                </div>
              </div>

              <div className="bg-primary/10 rounded-lg p-6 border border-primary/20">
                <h3 className="text-xl font-bold mb-4">Прогноз результатов</h3>
                <div className="grid md:grid-cols-3 gap-6">
                  <div>
                    <div className="text-sm text-muted-foreground mb-1">Текущая выручка/мес</div>
                    <div className="text-2xl font-bold">{results.currentRevenue.toLocaleString()} ₽</div>
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground mb-1">Продаж/мес</div>
                    <div className="text-2xl font-bold">{results.currentSalesCount}</div>
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground mb-1">Эффект +3 п.п. к конверсии</div>
                    <div className="text-2xl font-bold text-primary">+{results.effect.toLocaleString()} ₽</div>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground mt-4">
                  * Расчет показывает потенциальный эффект при увеличении конверсии на 3 процентных пункта
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      <section id="faq" className="py-20 px-4 animate-on-scroll">
        <div className="container mx-auto max-w-3xl">
          <h2 className="text-4xl font-bold mb-12 text-center">Частые вопросы</h2>
          <Accordion type="single" collapsible>
            <AccordionItem value="item-1">
              <AccordionTrigger>Через сколько будут первые результаты?</AccordionTrigger>
              <AccordionContent>
                Первые изменения видны через 2-4 недели: прозрачность процессов, понимание узких мест, начало работы по плану. 
                Измеримый рост показателей (конверсия, повторные продажи) — через 2-3 месяца системной работы.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-2">
              <AccordionTrigger>Вы ведете рекламу и делаете креативы?</AccordionTrigger>
              <AccordionContent>
                Нет. Я не таргетолог и не дизайнер. Моя задача — выстроить систему: стратегия, воронка, KPI, процессы. 
                Я ставлю задачи подрядчикам (рекламщикам, копирайтерам), контролирую качество их работы и отчетность, но сам креативы не делаю.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-3">
              <AccordionTrigger>Что нужно для начала работы?</AccordionTrigger>
              <AccordionContent>
                Доступ к статистике (CRM, рекламные кабинеты, финансовые показатели), 1-2 часа вашего времени для первичного интервью 
                и готовность команды внедрять изменения. Если CRM нет — поможем с выбором и настройкой.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-4">
              <AccordionTrigger>Как вы работаете с инвесторами?</AccordionTrigger>
              <AccordionContent>
                Провожу аудит коммерческой модели проекта (дилер, холдинг, стартап), оцениваю маркетинговую эффективность, 
                готовлю дорожную карту роста с прогнозом KPI. Помогаю понять, куда инвестировать в маркетинг и какие результаты ожидать.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </section>

      <section id="contact" className="py-20 px-4 bg-card/30 animate-on-scroll">
        <div className="container mx-auto max-w-2xl">
          <h2 className="text-4xl font-bold mb-4 text-center">Оставить заявку</h2>
          <p className="text-center text-muted-foreground mb-12">
            Заполните форму, и я свяжусь с вами в течение 24 часов
          </p>

          <Card>
            <CardContent className="pt-6">
              <form className="space-y-6" onSubmit={handleFormSubmit}>
                <div>
                  <Label htmlFor="name">Ваше имя</Label>
                  <Input
                    id="name"
                    placeholder="Иван Петров"
                    className="mt-2"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="contact">Telegram / WhatsApp / Email</Label>
                  <Input
                    id="contact"
                    placeholder="@username или email"
                    className="mt-2"
                    value={formData.contact}
                    onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="segment">Ваш бизнес</Label>
                  <Input
                    id="segment"
                    placeholder="Дилер запчастей / Агрохолдинг / КФХ / Инвестор"
                    className="mt-2"
                    value={formData.segment}
                    onChange={(e) => setFormData({ ...formData, segment: e.target.value })}
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="task">Ваша задача</Label>
                  <Textarea
                    id="task"
                    placeholder="Опишите, какую задачу хотите решить или какой результат получить"
                    rows={4}
                    className="mt-2"
                    value={formData.task}
                    onChange={(e) => setFormData({ ...formData, task: e.target.value })}
                    required
                  />
                </div>

                <div className="space-y-4 pt-2">
                  <div className="flex items-start gap-3">
                    <Checkbox
                      id="privacy"
                      checked={privacyAccepted}
                      onCheckedChange={(checked) => setPrivacyAccepted(checked as boolean)}
                      required
                    />
                    <label htmlFor="privacy" className="text-sm text-muted-foreground leading-relaxed cursor-pointer">
                      Я согласен с{' '}
                      <a href="#" className="text-primary hover:underline">
                        политикой конфиденциальности
                      </a>
                    </label>
                  </div>

                  <div className="flex items-start gap-3">
                    <Checkbox
                      id="data-processing"
                      checked={dataProcessingAccepted}
                      onCheckedChange={(checked) => setDataProcessingAccepted(checked as boolean)}
                      required
                    />
                    <label htmlFor="data-processing" className="text-sm text-muted-foreground leading-relaxed cursor-pointer">
                      Я даю согласие на{' '}
                      <a href="#" className="text-primary hover:underline">
                        обработку персональных данных
                      </a>
                    </label>
                  </div>
                </div>

                <Button 
                  type="submit" 
                  size="lg" 
                  className="w-full" 
                  disabled={formStatus === 'sending' || !privacyAccepted || !dataProcessingAccepted}
                >
                  {formStatus === 'sending' ? 'Отправка...' : 'Отправить заявку'}
                </Button>

                {formStatus === 'success' && (
                  <p className="text-center text-primary font-semibold">Заявка отправлена! Свяжусь с вами в течение 24 часов.</p>
                )}
                {formStatus === 'error' && (
                  <p className="text-center text-destructive">Ошибка отправки. Попробуйте позже или свяжитесь напрямую.</p>
                )}
              </form>

              <div className="mt-8 pt-8 border-t border-border">
                <h3 className="font-semibold mb-4 text-center">Контакты</h3>
                <div className="flex flex-col gap-3">
                  <div className="flex items-center gap-3 justify-center">
                    <Icon name="Send" className="text-primary" size={20} />
                    <span className="text-muted-foreground">Telegram: @agroconsulting</span>
                  </div>
                  <div className="flex items-center gap-3 justify-center">
                    <Icon name="MessageCircle" className="text-primary" size={20} />
                    <span className="text-muted-foreground">WhatsApp: +7 (999) 123-45-67</span>
                  </div>
                  <div className="flex items-center gap-3 justify-center">
                    <Icon name="Mail" className="text-primary" size={20} />
                    <span className="text-muted-foreground">Email: info@agroconsulting.ru</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      <footer className="py-8 px-4 border-t border-border">
        <div className="container mx-auto text-center text-muted-foreground">
          <p>© 2024 Агроконсалтинг. Маркетинговое сопровождение агробизнеса.</p>
        </div>
      </footer>
    </div>
  );
}