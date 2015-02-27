'''easy check of card number'''

def valid_card(card_number, card_type):
    if card_number.find("-") != -1:
        card_number = card_number.replace("-", "")
    if len(card_number) != 16:
        return False
    if card_type == "Visa" and card_number[0] != "4":
         return False
    if card_type == "MasterCard" and card_number[0] != "5":
        return False
    return True
