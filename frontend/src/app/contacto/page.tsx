import React from "react";
import { ContactPageModel } from "@/_domain/models/contact-page.model";
import { getContactPageData } from "@/_domain/services/contact-page.services";
import ResponsiveImage from "@/common/components/images/ResponsiveImage";
import CustomPortableText from "@/common/components/portable-text/CustomPortableText";
import { createMetadata } from "@/common/utils/helper-seo";
import { getCompanyData } from "@/_domain/services/company.services";
import { CompanyModel } from "@/_domain/models/company.model";
import "./page.css"
import HubspotForm from "@/common/components/forms/HubspotForm";
import ContactHeroSection from "./components/ContactHeroSection";
import { serialize } from "@/common/utils/helper-serialize";

export const generateMetadata = async () => {
	const rawData = await getContactPageData();
	const data = new ContactPageModel(rawData);
	return createMetadata(data.seo);
};

const page = async () => {
	const rawData = await getContactPageData();
	const rawCompanyData = await getCompanyData();

	const data = new ContactPageModel(rawData);
	const companyData = new CompanyModel(rawCompanyData);

	const center = {
		lat: companyData.location.number_location_latitude,   // number
		lng: companyData.location.number_location_longitude,  // number
	};
	return (
		<main id="Contact">
			<ContactHeroSection data={serialize(data)} />

			<section className="section__contact">
				<div className="column__2">
					<div className="col__left fadeInOut">
						<h3>Datos de contacto</h3>
						<h2>Contáctanos para recibir más información</h2>

						<ul role="list">
							<li>
								<a href={`tel:${companyData.contact.string_line_contact_phone}`}>
									{companyData.contact.string_line_contact_phone}
								</a>
							</li>
							<li>
								<a href={`mailto:${companyData.contact.string_line_contact_email}`}>
									{companyData.contact.string_line_contact_email}
								</a>
							</li>
							<li>
								<a href={companyData.location.url_location_googleMaps}>
									{companyData.contact.string_line_contact_address}
								</a>
							</li>
						</ul>
					</div>
					<div className="col__right">
						<HubspotForm />
					</div>
				</div>
			</section>
			<section className="section__map">
			    <div className="column__1">
			        <iframe
			            className="mapa"
			            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3724.7903269017866!2d-89.62999172341185!3d21.001040333097514!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8f5675004bf83fc5%3A0xdbbd0178c5246fee!2sIlco%20constructores.!5e0!3m2!1ses!2smx!4v1792707373010!5m2!1ses!2smx"
			            width="100%"
			            height="450"
			            style={{ border: 0 }}
			            allowFullScreen
			            loading="lazy"
			            referrerPolicy="strict-origin-when-cross-origin"
			            title="Ubicación de Ilco Constructores"
			        />
			    </div>
			</section>
		</main>
	);
};

export default page;
