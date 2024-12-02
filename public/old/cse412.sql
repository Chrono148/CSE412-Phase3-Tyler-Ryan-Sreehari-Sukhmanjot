--
-- PostgreSQL database dump
--

-- Dumped from database version 16.4
-- Dumped by pg_dump version 16.4

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: businesscontact; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.businesscontact (
    contlname character varying(255),
    contfname character varying(255),
    contemail character varying(255),
    contwebsite character varying(255),
    contphone character varying(20),
    contnum integer NOT NULL
);


ALTER TABLE public.businesscontact OWNER TO postgres;

--
-- Name: employee; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.employee (
    emproutingnum integer,
    empbankacctnum integer,
    empfname character varying(255),
    emplname character varying(255),
    empaddress character varying(255),
    empphone character varying(20),
    empemail character varying(255),
    empsalary numeric(9,2),
    emphiredate character varying(255),
    emplocnum integer,
    empnum integer NOT NULL
);


ALTER TABLE public.employee OWNER TO postgres;

--
-- Name: ingredient; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.ingredient (
    ingmeasurementtype character varying(255),
    ingname character varying(255),
    expdate character varying(255),
    ingqty integer,
    ingnum integer NOT NULL,
    supnum integer NOT NULL,
    locnum integer NOT NULL
);


ALTER TABLE public.ingredient OWNER TO postgres;

--
-- Name: location; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.location (
    locaddress character varying(255),
    locname character varying(255),
    loctype character varying(255),
    locdatefounded character varying(255),
    locnum integer NOT NULL
);


ALTER TABLE public.location OWNER TO postgres;

--
-- Name: locationconnects; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.locationconnects (
    id integer NOT NULL,
    concontnum integer,
    conlocnum integer
);


ALTER TABLE public.locationconnects OWNER TO postgres;

--
-- Name: orders; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.orders (
    ordtotal integer,
    orddelivered integer,
    ordtime character varying(255),
    orddate character varying(255),
    ordingnumlist character varying(255),
    ordsupnum integer,
    ordlocnum integer,
    ordnum integer NOT NULL
);


ALTER TABLE public.orders OWNER TO postgres;

--
-- Name: schedule; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.schedule (
    schpay integer,
    schendtime character varying(255),
    schstarttime character varying(255),
    schday character varying(255),
    schnum integer NOT NULL,
    schempnum integer NOT NULL
);


ALTER TABLE public.schedule OWNER TO postgres;

--
-- Name: supplier; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.supplier (
    supcountry character varying(255),
    supaddress character varying(255),
    supname character varying(255) NOT NULL,
    supprice numeric(8,2),
    supnum integer NOT NULL
);


ALTER TABLE public.supplier OWNER TO postgres;

--
-- Name: supplierconnects; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.supplierconnects (
    id integer NOT NULL,
    concontnum integer,
    consupnum integer
);


ALTER TABLE public.supplierconnects OWNER TO postgres;

--
-- Data for Name: businesscontact; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.businesscontact (contlname, contfname, contemail, contwebsite, contphone, contnum) FROM stdin;
Lamar	Kendrick	notlikeus@hotmail.com	grahamhater.com	(495)-831-7432	1
Posey	Buster	baseball@yahoo.com	strikeone.org	(422)-144-5553	2
Zhang	Kat	asuadmissions@hotmail.com	peachtree.com	(101)-032-8310	3
Bertis	Cassie	youdaillest@gmail.com	target.com	(123)-456-6621	4
Warks	Carl	prettyinpink@yahoo.com	professional.net	(113)-532-2222	5
Jackson	Lamar	footballpass@gmail.com	nflsundayticket.co.uk	(422)-124-5832	6
Gordon	James	commissionerGordon@hotmail.net	professorGoat.com	(124)-422-1156	7
Shmoe	Joe	schmoejoe@yahoo.com	regularguy.com	(495)-831-7432	8
Pascal	Pedro	pascalpedro@yahoo.com	lightscaemraaction.net	(212)-444-2567	9
Smith	Pauline	p.smith@hotmail.com	normalwebsite.com	(942)-431-1246	10
Lawrence	Trevor	l.trevor21@gmail.com	jaguarsofficial.com	(904)-222-1567	11
Johnson	Plato	the.thinker@sbcglobal.net	contemplations.org	(125)-333-4424	12
Kane	Kandy	sweettooth@yahoo.com	sweetheart.com	(211)-256-1315	13
Mattel	Trixie	Mattel.Trix@yahoo.com	devilwearsprada.net	(553)-124-7432	14
Romero	Julius	j.romero9@hotmail.com	redroses.com	(423)-525-1246	15
Wallace	Mike	wallacem26@gmail.com	ingredientsforsale.com	(444)-252-6654	16
Bennett	Caden	bennett.ca4@sbcglobal.net	milkandhoney.org	(244)-221-1126	17
\.


--
-- Data for Name: employee; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.employee (emproutingnum, empbankacctnum, empfname, emplname, empaddress, empphone, empemail, empsalary, emphiredate, emplocnum, empnum) FROM stdin;
123454	11111111	Tyler	Tannenbaum	1111 E Plant Dr.	(191)-000-1234	ooo@gmail.com	62732.50	11/22/2009	1	1
888888	64729374	Joe	Johnson	7384 W Summer Ln.	(818)-763-0291	power@hotmail.com	88863.12	08/22/1992	1	2
29475	74920733	Jane	Doe	2456 W Fall Dr.	(234)-211-0485	something@sbcglobal.com	95021.11	09/11/2011	1	3
784958	4957382	Suzzy	Smith	9494 N Mulberry St.	(111)-245-0392	innovation@gmail.com	100023.33	02/08/1989	2	4
859302	27591123	Peter	Peterson	9403 S Winter Ln.	(999)-824-0092	keepers234@yahoo.com	93054.19	03/01/2002	1	5
940502	85903845	Pamela	Winfrey	9032 W Indigo Dr.	(480)-226-2235	crazycatlady53@gmail.com	110324.94	09/29/2001	2	6
49532	88883942	Lindsay	Smith	4832 S Washington St.	(480)-111-2345	flowersAreCool@hotmail.com	104322.54	10/01/1988	2	7
\.


--
-- Data for Name: ingredient; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.ingredient (ingmeasurementtype, ingname, expdate, ingqty, ingnum, supnum, locnum) FROM stdin;
Pounds	Carrot	12/01/2024	18	1	8	3
Pounds	Basmati Rice	01/01/2027	300	2	7	5
Pounds	Green Peas	11/08/2024	20	3	4	1
Pounds	Garlic	03/04/2025	7	4	2	2
Pounds	Onion	12/29/2024	21	5	3	3
Dozens	Eggs	11/18/2024	27	6	1	4
Pounds	Corn Cob	11/25/2024	13	7	11	3
Count	Salt Container	01/01/2030	82	8	3	3
Count	Soy Sauce Bottle	12/31/2027	29	9	9	2
Pounds	Parsley	11/19/2024	80	10	8	5
\.


--
-- Data for Name: location; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.location (locaddress, locname, loctype, locdatefounded, locnum) FROM stdin;
8394 N. Eastside Ct.	Frowny’s Pizzareia	Pizza Parlor	10/22/1978	1
4125 S. Fairfield Ln.	Rusty’s Tacos	Taco Shop	02/01/2002	2
4422 N. Winter Ct.	The Solemn Mule	Bar	06/08/2010	3
6321 E. Indiana Dr.	The Crying Lion	Bar	12/09/2018	4
1252 S. Flamingo St.	Gary’s Storage	Storage House	02/21/1969	5
\.


--
-- Data for Name: locationconnects; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.locationconnects (id, concontnum, conlocnum) FROM stdin;
1	11	5
2	7	1
3	4	1
4	3	2
5	5	3
6	6	4
7	2	5
8	8	1
9	12	2
10	10	4
11	1	3
12	9	5
\.


--
-- Data for Name: orders; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.orders (ordtotal, orddelivered, ordtime, orddate, ordingnumlist, ordsupnum, ordlocnum, ordnum) FROM stdin;
12	3	15:03	09/20/2024	3,1,4	6	3	1
12	3	11:27	09/22/2024	1,5,9	2	1	2
12	3	12:09	09/24/2024	2,6,5	6	4	3
12	3	09:53	09/25/2024	3,5,8	4	1	4
12	3	16:27	10/01/2024	9,7,3	3	5	5
12	3	10:31	10/03/2024	2,3,8	8	2	6
12	3	16:01	10/04/2024	4,6,2	7	5	7
12	3	14:22	10/07/2024	6,4,3	11	3	8
\.


--
-- Data for Name: schedule; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.schedule (schpay, schendtime, schstarttime, schday, schnum, schempnum) FROM stdin;
15	17:00	14:00	Tuesday	1	1
15	13:30	10:30	Friday	2	1
15	12:00	09:00	Monday	3	2
15	14:30	11:30	Saturday	4	2
15	13:45	09:30	Wednesday	5	3
15	12:30	09:30	Sunday	6	3
15	17:00	14:00	Tuesday	7	4
15	13:30	10:30	Thursday	8	4
15	15:30	11:00	Friday	9	5
15	15:30	12:00	Saturday	10	5
15	17:00	14:00	Thursday	11	6
15	13:30	10:30	Tuesday	12	6
15	17:45	14:45	Wednesday	13	7
15	13:45	10:45	Sunday	14	7
\.


--
-- Data for Name: supplier; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.supplier (supcountry, supaddress, supname, supprice, supnum) FROM stdin;
Germany	8493 W Berlin St.	Paloma	5.99	1
France	1111 W Paris Ct.	Kroger	11.99	2
United States	4321 E Arizona Dr.	Chester’s	2.99	3
Russia	5321 W Moscow Ln.	Pavlova	10.49	4
United States	8493 S Oregon St.	Moe’s	11.99	5
Switzerland	5322 N Sandy Ln.	Lakeside	4.99	6
Romania	0392 S Dracula Ct.	Lowes	15.99	7
Mexico	9201 E Flores St.	Del Mar	3.99	8
Germany	1112 W Hamburg Dr.	Kaiser	13.99	9
United States	9483 N Florida St.	Ralphs	3.99	10
Canada	4212 S Ottawa Ct.	Norberry	9.99	11
United States	9422 W Texas St.	Bonnie’s	7.99	12
\.


--
-- Data for Name: supplierconnects; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.supplierconnects (id, concontnum, consupnum) FROM stdin;
1	15	5
2	16	4
3	13	3
4	14	1
5	17	2
6	11	6
7	12	7
8	2	8
9	3	9
10	7	10
11	9	11
12	1	12
\.


--
-- Name: businesscontact businesscontact_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.businesscontact
    ADD CONSTRAINT businesscontact_pkey PRIMARY KEY (contnum);


--
-- Name: employee employee_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.employee
    ADD CONSTRAINT employee_pkey PRIMARY KEY (empnum);


--
-- Name: ingredient ingredient_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.ingredient
    ADD CONSTRAINT ingredient_pkey PRIMARY KEY (ingnum, supnum, locnum);


--
-- Name: location location_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.location
    ADD CONSTRAINT location_pkey PRIMARY KEY (locnum);


--
-- Name: locationconnects locationconnects_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.locationconnects
    ADD CONSTRAINT locationconnects_pkey PRIMARY KEY (id);


--
-- Name: orders orders_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.orders
    ADD CONSTRAINT orders_pkey PRIMARY KEY (ordnum);


--
-- Name: schedule schedule_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.schedule
    ADD CONSTRAINT schedule_pkey PRIMARY KEY (schnum, schempnum);


--
-- Name: schedule schedule_schnum_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.schedule
    ADD CONSTRAINT schedule_schnum_key UNIQUE (schnum);


--
-- Name: supplier supplier_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.supplier
    ADD CONSTRAINT supplier_pkey PRIMARY KEY (supnum);


--
-- Name: supplierconnects supplierconnects_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.supplierconnects
    ADD CONSTRAINT supplierconnects_pkey PRIMARY KEY (id);


--
-- Name: employee employee_emplocnum_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.employee
    ADD CONSTRAINT employee_emplocnum_fkey FOREIGN KEY (emplocnum) REFERENCES public.location(locnum);


--
-- Name: ingredient ingredient_locnum_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.ingredient
    ADD CONSTRAINT ingredient_locnum_fkey FOREIGN KEY (locnum) REFERENCES public.location(locnum);


--
-- Name: ingredient ingredient_supnum_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.ingredient
    ADD CONSTRAINT ingredient_supnum_fkey FOREIGN KEY (supnum) REFERENCES public.supplier(supnum);


--
-- Name: locationconnects locationconnects_concontnum_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.locationconnects
    ADD CONSTRAINT locationconnects_concontnum_fkey FOREIGN KEY (concontnum) REFERENCES public.businesscontact(contnum);


--
-- Name: locationconnects locationconnects_conlocnum_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.locationconnects
    ADD CONSTRAINT locationconnects_conlocnum_fkey FOREIGN KEY (conlocnum) REFERENCES public.location(locnum);


--
-- Name: orders orders_ordlocnum_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.orders
    ADD CONSTRAINT orders_ordlocnum_fkey FOREIGN KEY (ordlocnum) REFERENCES public.location(locnum);


--
-- Name: orders orders_ordsupnum_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.orders
    ADD CONSTRAINT orders_ordsupnum_fkey FOREIGN KEY (ordsupnum) REFERENCES public.supplier(supnum);


--
-- Name: schedule schedule_schempnum_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.schedule
    ADD CONSTRAINT schedule_schempnum_fkey FOREIGN KEY (schempnum) REFERENCES public.employee(empnum) ON DELETE CASCADE;


--
-- Name: supplierconnects supplierconnects_concontnum_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.supplierconnects
    ADD CONSTRAINT supplierconnects_concontnum_fkey FOREIGN KEY (concontnum) REFERENCES public.businesscontact(contnum);


--
-- Name: supplierconnects supplierconnects_consupnum_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.supplierconnects
    ADD CONSTRAINT supplierconnects_consupnum_fkey FOREIGN KEY (consupnum) REFERENCES public.supplier(supnum);


--
-- PostgreSQL database dump complete
--

