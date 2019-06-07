package com.ibm.bluebooking;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

public class Result {
	private Hotel hotel;
	
	private Date checkin;
	
	private Date checkout;
	
	private float rate;
	
	private List<String> messages = new ArrayList<String>();
	
	public Result() {
		
	}
	
	public Result(Hotel hotel, Date checkin, Date checkout) {
		super();
		this.hotel = hotel;
		this.checkin = checkin;
		this.checkout = checkout;
	}

	public int getDaysAhead() {
		Date today = new Date();
		double diffInMs = Math.abs(checkin.getTime() - today.getTime());
		return (int) Math.ceil(diffInMs/(1000*60*60*24));
	}
	
	public int getNbNights() {
		double diffInMs = Math.abs(checkout.getTime() - checkin.getTime());
		return (int) Math.ceil(diffInMs/(1000*60*60*24));
	}
	
	public Hotel getHotel() {
		return hotel;
	}

	public void setHotel(Hotel hotel) {
		this.hotel = hotel;
	}

	public Date getCheckin() {
		return checkin;
	}

	public void setCheckin(Date checkin) {
		this.checkin = checkin;
	}

	public Date getCheckout() {
		return checkout;
	}

	public void setCheckout(Date checkout) {
		this.checkout = checkout;
	}

	public float getRate() {
		return rate;
	}

	public void setRate(float rate) {
		this.rate = Math.round(rate);
	}
	
	public List<String> getMessages() {
		return messages;
	}
	
	public void addMessage(String message) {
		this.messages.add(message);
	}

	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + ((checkin == null) ? 0 : checkin.hashCode());
		result = prime * result
				+ ((checkout == null) ? 0 : checkout.hashCode());
		result = prime * result + ((hotel == null) ? 0 : hotel.hashCode());
		result = prime * result
				+ ((messages == null) ? 0 : messages.hashCode());
		result = prime * result + Float.floatToIntBits(rate);
		return result;
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		Result other = (Result) obj;
		if (checkin == null) {
			if (other.checkin != null)
				return false;
		} else if (!checkin.equals(other.checkin))
			return false;
		if (checkout == null) {
			if (other.checkout != null)
				return false;
		} else if (!checkout.equals(other.checkout))
			return false;
		if (hotel == null) {
			if (other.hotel != null)
				return false;
		} else if (!hotel.equals(other.hotel))
			return false;
		if (messages == null) {
			if (other.messages != null)
				return false;
		} else if (!messages.equals(other.messages))
			return false;
		if (Float.floatToIntBits(rate) != Float.floatToIntBits(other.rate))
			return false;
		return true;
	}

}
